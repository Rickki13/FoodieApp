import {UserInfo} from "./users.interface";

export interface Posts {
  id: number;
  title: string;
  tags: string;
  user: UserInfo;
  image: string;
  body: string;
  timeCooking: number;
  favorite: boolean;
}
