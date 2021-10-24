import React from "react";
import { View } from "react-native";
import { useAuthContext } from "../contexts/AuthContext";
import styles from "../styles/components/SignInBox.styles";
import { COLORS } from "../theme";
import Button from "./Button";

const SignInBox: React.FC = () => {
  const { signIn } = useAuthContext();

  return (
    <View style={styles.container}>
      <Button
        onPress={signIn}
        style={{ backgroundColor: COLORS.YELLOW, color: COLORS.BLACK_PRIMARY }}
      >
        Entrar com o Github
      </Button>
    </View>
  );
};

export default SignInBox;
