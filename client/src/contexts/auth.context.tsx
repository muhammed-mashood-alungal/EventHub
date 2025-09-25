import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/auth.services";
import type { IUser } from "../types/user.types";

type AuthContextType = {
  user: IUser | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser | null, token?: string) => void;
  removeAuth: () => void;
  logout: () => void;
  authLoading?: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setAuthLoading(true);
      const { user } = await AuthService.authMe();
      setAuth(user);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      removeAuth();
    } finally {
      setAuthLoading(false);
    }
  };

  const setAuth = (user: IUser | null, token?: string) => {
    setUser(user);
    setIsAuthenticated(true);
    setAuthLoading(false);
    if (token) {
      localStorage.setItem("event_hub_token", token);
    }
  };

  const removeAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const logout = async () => {
      await AuthService.logout();
      localStorage.removeItem("event_hub_token");
      removeAuth();

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setAuth,
        removeAuth,
        authLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
