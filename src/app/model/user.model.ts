export class UserModel {
    id?: number;
    name?: string;
    username?: string;
    email?: string="";
  password?: string ="";
    constructor(id?: number, name?: string, username?: string, email?: string,password?: string) {
      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.password=password;
    }
  }
  