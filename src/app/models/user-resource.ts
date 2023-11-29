export class User {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    roles?: string;
  
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
  }
  