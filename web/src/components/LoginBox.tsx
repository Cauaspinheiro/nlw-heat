import { FC } from "react";
import { VscGithubInverted } from "react-icons/vsc";

import styles from "../styles/LoginBox.module.scss";

const LoginBox: FC = () => {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};

export default LoginBox;
