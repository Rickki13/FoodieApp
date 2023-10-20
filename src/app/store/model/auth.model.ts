export interface Auth {
  access_token: string | null;
  role: 'guest'| 'user' | 'admin';
  username: string | null;
  id: number | null;
  fullname: string | null;
  image: string | null;
  isAuth: boolean;
}

export interface User {
  username: string;
  password: string;
}

export class AuthUpdate {
  static readonly type = '[Auth]: Auth Update';
  constructor(public payload: Auth) {}
}
