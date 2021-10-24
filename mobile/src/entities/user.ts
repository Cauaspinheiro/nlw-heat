export default class User {
  id: string;
  name: string;
  avatar_url: string;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.avatar_url = props.avatar_url;
  }
}
