import React, { createContext, useEffect, useState } from "react";
import User from "../entities/user";
import * as AuthSession from "expo-auth-session";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthContext {
  user?: User | null;
  isLoading: boolean;

  signIn(): Promise<void>;
  signOut(): Promise<void>;
  restoreSession(): Promise<void>;
}

export interface AuthResponseProps {
  token: string;
  user: User;
}

export interface AuthorizationResponse {
  params: {
    code?: string;
  };
  type: "cancel" | "dismiss" | "locked";
}

const Context = createContext<AuthContext | null>(null);

export function useAuthContext(): AuthContext {
  const context = React.useContext(Context);
  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}

const CLIENT_ID = "efbde7f821366debc430";
const SCOPE = "read:user";
const USER_STORAGE_KEY = "@nlw/user";
const TOKEN_STORAGE_KEY = "@nlw/token";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  const signIn = async () => {
    try {
      setIsLoading(true);

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
        returnUrl: "nlw://github/callback",
      })) as AuthorizationResponse;

      if (type === "cancel" || type === "dismiss" || !params || !params.code) {
        return setIsLoading(false);
      }

      const {
        data: { token, user },
      } = await api.post<AuthResponseProps>("/authenticate", {
        code: params.code,
      });

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  };

  const restoreSession = async () => {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && user) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setUser(JSON.parse(user));
    } else {
      setUser(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <Context.Provider
      value={{
        isLoading,
        signIn,
        signOut,
        user,
        restoreSession,
      }}
    >
      {children}
    </Context.Provider>
  );
};
