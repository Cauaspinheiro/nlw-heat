import User from "./user";

export default class Message {
  user_id: string;
  text: string;
  user: User;

  constructor(props: Message) {
    this.user_id = Math.random().toString() + props.user_id;
    this.text = props.text;
    this.user = props.user;
  }
}
