export interface ApiErrorPayload {
  timestamp?: string;
  status?: number;
  code?: string;
  message?: string;
  path?: string;
  details?: Record<string, string>;
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: string;
  readonly path?: string;
  readonly details: Record<string, string>;
  readonly raw?: unknown;

  constructor(payload: ApiErrorPayload, fallbackStatus: number, raw?: unknown) {
    super(payload.message || "No se pudo completar la solicitud");
    this.name = "ApiClientError";
    this.status = payload.status ?? fallbackStatus;
    this.code = payload.code ?? "request_error";
    this.path = payload.path;
    this.details = payload.details ?? {};
    this.raw = raw;
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "status" in error &&
    (error as any).name === "ApiClientError"
  );
}

export function getUserErrorMessage(error: unknown, fallback = "Ocurrio un error inesperado"): string {
  if (isApiClientError(error)) {
    const firstDetail = Object.values(error.details)[0];
    return firstDetail || error.message || fallback;
  }

  if (error instanceof Error) return error.message || fallback;
  return fallback;
}
