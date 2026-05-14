import type { IHttpClient, RequestOptions } from "@/src/core/interfaces/IHttpClient";
import { ApiClientError, type ApiErrorPayload } from "./ApiClientError";

export class HttpClient implements IHttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly defaultHeaders: Record<string, string> = {},
    private readonly getToken?: () => string | null
  ) {}

  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const token = this.getToken?.();
    let res: Response;

    try {
      res = await fetch(`${this.baseUrl}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...this.defaultHeaders,
          ...options?.headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: options?.signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw error;
      }

      throw new ApiClientError({
        status: 0,
        code: "network_error",
        message: "No se pudo conectar con el servidor",
        path: url,
      }, 0, error);
    }

    if (!res.ok) {
      const raw = await this.readBody(res);
      const payload = this.toErrorPayload(raw, res, url);
      throw new ApiClientError(payload, res.status, raw);
    }

    // 204 No Content
    if (res.status === 204) return undefined as T;

    const raw = await this.readBody(res);
    return raw as T;
  }

  private async readBody(res: Response): Promise<unknown> {
    const text = await res.text();
    if (!text) return undefined;

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  private toErrorPayload(raw: unknown, res: Response, url: string): ApiErrorPayload {
    if (raw && typeof raw === "object") {
      const value = raw as ApiErrorPayload & { error?: string };
      return {
        timestamp: value.timestamp,
        status: value.status ?? res.status,
        code: value.code ?? value.error ?? "request_error",
        message: value.message ?? res.statusText,
        path: value.path ?? url,
        details: value.details,
      };
    }

    return {
      status: res.status,
      code: "request_error",
      message: typeof raw === "string" && raw.trim() ? raw : res.statusText,
      path: url,
    };
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
