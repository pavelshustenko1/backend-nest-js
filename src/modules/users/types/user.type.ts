export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(fields: Partial<User>) {
    Object.assign(this, fields);
  }
}
