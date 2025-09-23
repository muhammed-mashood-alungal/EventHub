import "./App.css";
import { Provider } from "./components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context";
import { ToastProvider } from "./contexts/toast.context";
import { Toaster } from "./components/ui/toaster";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Provider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppRoutes />
              <Toaster />
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
