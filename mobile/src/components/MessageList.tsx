import React, { useEffect, useState } from "react";

import { ScrollView } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import Message from "../entities/message";
import api from "../services/api";

import styles from "../styles/components/MessageList.styles";
import { MESSAGES_EXAMPLE } from "../utils/messages";
import MessageItem from "./MessageItem";

let messagesQueue: Message[] = MESSAGES_EXAMPLE as Message[];

const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);
});

const MessageList: React.FC = () => {
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const { data } = await api.get<Message[]>("/messages");

    setCurrentMessages(data);
  };

  const handleSetNewMessage = () => {
    if (messagesQueue.length > 0) {
      setCurrentMessages((m) => [messagesQueue[0], m[0], m[1]]);
      messagesQueue.shift();
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(handleSetNewMessage, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
