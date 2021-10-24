import React, { useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";
import SignInBox from "../components/SignInBox";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../styles/screens/Home.styles";
import { COLORS } from "../theme";

const Home: React.FC = () => {
  const { user } = useAuthContext();

  if (user === undefined) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size={40} color={COLORS.PINK} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header />

      <MessageList />

      {user ? <SendMessageForm /> : <SignInBox />}
    </KeyboardAvoidingView>
  );
};

export default Home;
