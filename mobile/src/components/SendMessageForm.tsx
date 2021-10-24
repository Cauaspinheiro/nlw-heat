import React, { useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import api from "../services/api";
import styles from "../styles/components/SendMessageForm.styles";
import { COLORS } from "../theme";
import Button from "./Button";

const SendMessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendMessage = async () => {
    setIsSendingMessage(true);

    if (!message.trim()) {
      Alert.alert("Oops!", "Digite sua mensagem!");

      setIsSendingMessage(false);
      return setMessage("");
    }

    await api.post("/messages", { message });

    setMessage("");
    setIsSendingMessage(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={(text) => setMessage(text)}
        value={message}
        editable={!isSendingMessage}
      />

      <Button
        onPress={handleSendMessage}
        style={{ backgroundColor: COLORS.PINK, color: COLORS.WHITE }}
        isLoading={isSendingMessage}
      >
        ENVIAR MENSAGEM
      </Button>
    </View>
  );
};

export default SendMessageForm;
