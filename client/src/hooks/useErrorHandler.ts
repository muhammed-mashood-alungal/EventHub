import { useToastNotifier } from "../contexts/toast.context";

export function useErrorHandler() {
  const { notifyError } = useToastNotifier();

  return (error: unknown, context?: string) => {
    if (error instanceof Error) {
      console.error(`${context || "Error"}:`, error.message);
      notifyError(context || "Error", error.message);
    } else {
      console.error(`${context || "Error"}: Unexpected error`);
      notifyError(context || "Unexpected Error", "Something went wrong");
    }
  };
}
