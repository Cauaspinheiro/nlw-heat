import { MotiView } from "@motify/components";
import React from "react";
import { Text, View } from "react-native";
import Message from "../entities/message";

import styles from "../styles/components/MessageItem.styles";
import UserPhoto from "./UserPhoto";

export interface MessageProps {
  message: Message;
}

const MessageItem: React.FC<MessageProps> = (props) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 800 }}
      style={styles.container}
    >
      <Text style={styles.message}>{props.message.text}</Text>

      <View style={styles.footer}>
        <UserPhoto size="small" avatarUrl={props.message.user.avatar_url} />

        <Text style={styles.userName}>{props.message.user.name}</Text>
      </View>
    </MotiView>
  );
};

export default MessageItem;
