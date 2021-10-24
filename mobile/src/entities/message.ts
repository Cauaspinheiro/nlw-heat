import User from "./user";

export default class Message {
  id: string;
  text: string;
  user: User;

  constructor(props: Message) {
    this.id = props.id;
    this.text = props.text;
    this.user = props.user;
  }
}
