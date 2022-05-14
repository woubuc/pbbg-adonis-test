import { goto } from '$app/navigation';
import type { Writable } from 'svelte/store';
import type { JsonValue } from 'type-fest';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type Body<T extends Record<string, JsonValue> = Record<string, JsonValue>> = FormData | T;

type UrlPart = string | number;

class RequestBuilder<T> {

	private endpoint: string;
	private searchParams = new URLSearchParams();
	private headers = new Headers();
	private init: RequestInit = {};

	private mapFn?: (data: T) => T;
	private updateStore?: Writable<T | null>;

	private ignoreErrors: boolean = false;

	public constructor(private method: HttpMethod, url: UrlPart[]) {
		this.endpoint = url
			.map(u => u.toString())
			.map(u => u.startsWith('/') ? u.slice(1) : u)
			.join('/');
	}

	/**
	 * Adds a request header
	 */
	public header(name: string, value: string): RequestBuilder<T> {
		this.headers.set(name, value);
		return this;
	}

	/**
	 * Adds a query parameter to the request
	 */
	public query(key: string, value: string | number): RequestBuilder<T> {
		this.searchParams.set(key, value.toString());
		return this;
	}

	/**
	 * Sets the request body
	 *
	 * If `body` is an object, it will be serialised as JSON and the
	 * `Content-Type: application/json` header will be set automatically.
	 */
	public body(body: Body): RequestBuilder<T> {
		if (body instanceof FormData) {
			this.init.body = body;
		} else {
			this.headers.set('Content-Type', 'application/json');
			this.init.body = JSON.stringify(body);
		}
		return this;
	}

	/**
	 * Returns `null` instead of throwing a `RequestError` when receiving a non-2xx response
	 */
	public optional(): RequestBuilder<T | null> {
		this.ignoreErrors = true;
		return this as any;
	}

	/**
	 * Maps the response data using the provided function
	 */
	public map(parseFn: (data: T) => T): RequestBuilder<T> {
		this.mapFn = parseFn;
		return this;
	}

	/**
	 * Sets the value of a writable store to the response body
	 *
	 * @param store - Store to update
	 */
	public set(store: Writable<T> | Writable<T | null>): RequestBuilder<T> {
		this.updateStore = store;
		return this;
	}

	/**
	 * Executes the request
	 *
	 * @returns The response body
	 *
	 * @throws {RequestError} if the response status is not 2xx
	 */
	public exec(): Promise<T> {
		return this.execRequest() as any;
	}

	private async execRequest(): Promise<T | null> {
		let url = `${ import.meta.env.VITE_SERVER_BASE_URL }/${ this.endpoint }?${ this.searchParams.toString() }`;

		let response = await fetch(url, {
			...this.init,
			headers: this.headers,
			method: this.method.toUpperCase(),
			credentials: 'include',
		});

		if (response.status === 204) {
			this.updateStore?.set(null);
			return null;
		}

		let body: any = await response.text();
		if (body.length > 0) {
			body = JSON.parse(body);
		}

		if (response.status >= 300) {
			if (this.ignoreErrors) {
				this.updateStore?.set(null);
				return null;
			}

			if (response.status === 401) {
				await goto('/login');
			}

			throw new RequestError(response.status, body);
		}

		this.updateStore?.set(body);

		return body;
	}
}

export const request = {
	get<T = unknown>(...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('get', url);
	},
	post<T = unknown>(...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('post', url);
	},
	put<T = unknown>(...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('put', url);
	},
	patch<T = unknown>(...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('patch', url);
	},
	delete<T = unknown>(...url: UrlPart[]): RequestBuilder<T> {
		return new RequestBuilder('delete', url);
	},
};

export interface ValidationError {
	rule: string;
	field: string;
	message: string;
}

export class RequestError extends Error {
	public constructor(
		public readonly status: number,
		public readonly body: Record<string, any>,
	) {
		super();
	}

	public get errors(): ValidationError[] {
		if (!this.body.errors || !Array.isArray(this.body.errors)) {
			return [];
		}

		return this.body.errors;
	}

	public forField(name: string): ValidationError[] {
		return this.errors.filter(e => e.field === name);
	}

	public hasError(rule: string): boolean {
		for (let error of this.errors) {
			if (error.rule === rule) {
				return true;
			}
		}

		return false;
	}
}
