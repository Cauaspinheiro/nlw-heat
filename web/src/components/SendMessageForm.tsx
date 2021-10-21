import { FC, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import { useAuthContext } from "../context/auth";
import api from "../services/api";

import styles from "../styles/SendMessageForm.module.scss";

const SendMessageForm: FC = () => {
  const { user, signOut } = useAuthContext();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post("/messages", { message });

    setMessage("");
  };

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />

          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm} onSubmit={handleSubmit}>
        <label htmlFor="message">Mensagem</label>

        <textarea
          onChange={(e) => setMessage(e.target.value)}
          id="message"
          name="message"
          placeholder="Qual é a sua expectativa para o evento?"
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
};

export default SendMessageForm;
