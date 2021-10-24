import React from "react";
import Home from "./src/screens/Home";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { StatusBar, View } from "react-native";
import { COLORS } from "./src/theme";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <AuthProvider>
      <Home />

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.BLACK_SECONDARY}
        translucent
      />
    </AuthProvider>
  );
}
