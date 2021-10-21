import { FC } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { useAuthContext } from "../context/auth";

import styles from "../styles/LoginBox.module.scss";

const LoginBox: FC = () => {
  const { user, signInUrl } = useAuthContext();

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>

      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};

export default LoginBox;
