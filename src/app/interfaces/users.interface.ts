export interface UserInfo {
  id: number;
  date: string;
  name: string
  image: string;
}

export interface RegUser {
  email: string;
  password: string;
}

export interface Users {
  userId: number;
  username: string;
  role: string;
  posts: number;
  fullName: string;
  dateLastEntry: string;
  lastDevice: string;
  lastOS: string;
  image: string;
}
