import { FC } from "react";
import LoginBox from "./components/LoginBox";
import MessageList from "./components/MessageList";

import styles from "./styles/App.module.scss";

const App: FC = () => {
  return (
    <main className={styles.contentWrapper}>
      <MessageList />

      <LoginBox />
    </main>
  );
};

export default App;
