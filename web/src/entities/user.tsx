export default class User {
  name: string;
  login: string;
  avatar_url: string;
  id: string;

  constructor(user: User) {
    this.name = user.name;
    this.login = user.login;
    this.avatar_url = user.avatar_url;
    this.id = user.id;
  }
}
