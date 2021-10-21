import { FC } from "react";
import LoginBox from "./components/LoginBox";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import { useAuthContext } from "./context/auth";

import styles from "./styles/App.module.scss";

const App: FC = () => {
  const { user } = useAuthContext();

  return (
    <div className={user?.name ? styles.backgroundSigned : styles.background}>
      <main className={styles.contentWrapper}>
        <MessageList />

        {user === null && <LoginBox />}
        {user?.name && <SendMessageForm />}
        {user === undefined && (
          <div className={styles.loading}>
            <p>Carregando...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
