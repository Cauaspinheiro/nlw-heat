import { FC } from "react";

import LogoImg from "../assets/logo.svg";

import styles from "../styles/MessageList.module.scss";

const MessageList: FC = () => {
  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="DoWhile 2021" />

      <div className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            natus architecto quidem, accusamus modi beatae sit ad est. Ullam
            doloribus sapiente voluptatibus quas? Adipisci facere sit dolorem
            quasi possimus cum.
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/cauaspinheiro.png"
                alt="Cauã Pinheiro"
              />
            </div>

            <span>Cauã Pinheiro</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            natus architecto quidem, accusamus modi beatae sit ad est. Ullam
            doloribus sapiente voluptatibus quas? Adipisci facere sit dolorem
            quasi possimus cum.
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/cauaspinheiro.png"
                alt="Cauã Pinheiro"
              />
            </div>

            <span>Cauã Pinheiro</span>
          </div>
        </li>

        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            natus architecto quidem, accusamus modi beatae sit ad est. Ullam
            doloribus sapiente voluptatibus quas? Adipisci facere sit dolorem
            quasi possimus cum.
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/cauaspinheiro.png"
                alt="Cauã Pinheiro"
              />
            </div>

            <span>Cauã Pinheiro</span>
          </div>
        </li>
      </div>
    </div>
  );
};

export default MessageList;
