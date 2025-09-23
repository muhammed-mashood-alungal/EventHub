import "./App.css";
import { Provider } from "./components/ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/SignInPage";
import SignupPage from "./pages/auth/SignupPage";
import { AuthProvider } from "./contexts/auth.context";
import { ToastProvider } from "./contexts/toast.context";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      <Provider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage role="user" />} />
                <Route
                  path="/org/signup"
                  element={<SignupPage role="organizer" />}
                />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
