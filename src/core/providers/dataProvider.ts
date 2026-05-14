import type { IDataProvider } from "@/src/core/interfaces/IDataProvider";
import { LocalStorageProvider } from "@/src/infrastructure/localstorage/LocalStorageProvider";
import { ApiProvider } from "@/src/infrastructure/api/ApiProvider";
import { HttpClient } from "@/src/infrastructure/api/HttpClient";

let instance: IDataProvider | null = null;

export function getDataProvider(): IDataProvider {
  if (instance) return instance;

  const mode = process.env.NEXT_PUBLIC_DATA_PROVIDER ?? "local";

  if (mode === "api") {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
    instance = new ApiProvider(new HttpClient(baseUrl, {}, () => {
      if (typeof window === "undefined") return null;
      return window.localStorage.getItem("fitcode:auth-token");
    }));
  } else {
    instance = new LocalStorageProvider();
  }

  return instance;
}

/** Útil en tests para inyectar un provider custom */
export function setDataProvider(provider: IDataProvider): void {
  instance = provider;
}
