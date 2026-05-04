import type { IHttpClient, RequestOptions } from "@/src/core/interfaces/IHttpClient";

export class HttpClient implements IHttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly defaultHeaders: Record<string, string> = {}
  ) {}

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...this.defaultHeaders,
        ...options?.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: options?.signal,
    });

    if (!res.ok) {
      const message = await res.text().catch(() => res.statusText);
      throw new Error(`[${res.status}] ${message}`);
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }

  get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, undefined, options);
  }

  post<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.request<T>("POST", url, body, options);
  }

  put<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", url, body, options);
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, undefined, options);
  }
}
