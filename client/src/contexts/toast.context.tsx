import { createContext, useContext, type ReactNode } from "react";
import { toaster } from "../components/ui/toaster";

type ToastContextType = {
  notifySuccess: (title: string, description?: string) => void;
  notifyError: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const notifySuccess = (title: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "success",
      duration: 3000,
      closable: true,
    });
  };

  const notifyError = (title: string, description?: string) => {
    toaster.create({
      title,
      description,
      type: "error",
      duration: 4000,
      closable: true,
    });
  };

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastNotifier = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastNotifier must be used within a ToastProvider");
  }
  return context;
};
