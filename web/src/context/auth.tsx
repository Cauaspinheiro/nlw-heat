import { createContext, FC, useContext, useEffect, useState } from "react";
import User from "../entities/user";
import api from "../services/api";

interface AuthContext {
  user?: User | null;
  signInUrl: string;

  signOut(): void;
}

interface AuthResponse {
  token: string;
  user: User;
}

const Context = createContext<AuthContext | null>(null);

export function useAuthContext(): AuthContext {
  const value = useContext(Context);

  if (value === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return value;
}

export const AuthProvider: FC = ({ children }) => {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=efbde7f821366debc430`;

  const [user, setUser] = useState<User | null>();

  const signIn = async (code: string) => {
    const { data } = await api.post<AuthResponse>("/authenticate", { code });

    const { token, user } = data;

    localStorage.setItem("token", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
  };

  const restoreSession = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await api.get<User>("/me");

      return setUser(data);
    }

    setUser(null);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, code] = url.split("?code=");

      window.history.replaceState({}, "", urlWithoutCode);

      signIn(code);
    } else {
      restoreSession();
    }
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        signInUrl,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};
