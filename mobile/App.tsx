import React, { Fragment } from "react";
import Home from "./src/screens/Home";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { StatusBar, View } from "react-native";
import { COLORS } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View style={{ flex: 1 }}>
      <Home />

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.BLACK_SECONDARY}
        translucent
      />
    </View>
  );
}
