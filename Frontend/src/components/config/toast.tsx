import { AxiosError } from "axios";
import { ExternalToast, toast } from "sonner";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ApiErrorResponseData {
  message?: string;
}

export const toastErrorConfig = (baseDescription: string, error?: unknown,   config?: ExternalToast) => {
  let description;

  if (error instanceof AxiosError) {
    if (error.response) {
      const errorData = error.response.data as ApiErrorResponseData;
      description = errorData.message || "Erro desconhecido do servidor";
    } else if (error.message === "Network Error") {
      description = "Erro ao comunicar com o servidor - Erro de rede";
    } else {
      description = error.message;
    }
  }
  if (!description) {
    if (error instanceof Error) {
      description = error.message;
    }

    if (typeof error === "string") {
      description = error;
    }
  }

  toast.error(baseDescription, {
    description,

    position: "bottom-right",...config
  });
};

export const toastSuccessConfig = (
  baseDescription: string,
  config?: ExternalToast
) => {
  toast.success(baseDescription, { position: "bottom-right", ...config });
};

export const toastPromiseConfig = async <T,>({
  fn,
  loading = "Processando...",
  success = "Sucesso!",
  position = "bottom-right",
  finallyFn,
  duration = 5000,
}: {
  fn: Promise<T>;
  loading?: string;
  success?: string;
  position?: Position;
  finallyFn?: () => void | Promise<void>;
  duration?: number;
}): Promise<T> => {
  try {
    toast.promise(fn, {
      loading,
      success,
      error: (e) => {
        if (e instanceof AxiosError) return handleAxiosError(e);
        if (e instanceof Error) return e.message;
        return "Erro desconhecido";
      },
      position,
      duration,
      closeButton: true,
    });
    return fn;
  } finally {
    if (finallyFn) await finallyFn();
  }
};

const handleAxiosError = (e: AxiosError): string => {
  if (e.response) {
    const errorData = e.response.data as ApiErrorResponseData;
    return errorData.message || "Erro desconhecido do servidor";
  }
  return e.message === "Network Error" ? "Erro interno do servidor" : e.message;
};
