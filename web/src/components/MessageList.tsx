import { FC, useEffect, useState } from "react";

import LogoImg from "../assets/logo.svg";
import User from "../entities/user";
import api from "../services/api";
import io from "socket.io-client";

import styles from "../styles/MessageList.module.scss";

interface Message {
  created_at: string;
  text: string;
  user: User;
  id: string;
  user_id: string;
}

const socket = io("http://localhost:4000");

socket.on("new_message", (message: Message) => {
  message.id = `${message.user_id}-${message.created_at}`;

  messagesQueue.push(message);

  console.log(message);
});

const messagesQueue: Message[] = [];

const MessageList: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages((m) => [messagesQueue[0], m[0], m[1]].filter(Boolean));

        messagesQueue.shift();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.get<Message[]>("/messages").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="DoWhile 2021" />

      <div className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>

            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt="Cauã Pinheiro" />
              </div>

              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
