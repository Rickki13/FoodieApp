import {UserInfo} from "./users.interface";

export interface OneRecipe {
  id: number;
  title: string;
  body: string;
  tags: string;
  user: UserInfo;
  image: string;
  timeCooking: number;
  foodValue: FoodValue;
  comments: Comments[];
  additionalInformation: AdditionalInformation;
  favorite: boolean;
}

export interface FoodValue {
  calories: number;
  belki: number;
  fats: number;
  carbohydrates: number;
}

export interface AdditionalInformation {
  ingredients: string[] ;
  details: Detail[];
}

export interface Detail {
  title: string;
  body: string;
}

export interface Comments {
  postId: number;
  id: number ;
  body: string;
  user: UserComment;
  dateCreated: string;
}

export interface UserComment {
  id: number;
  username: string;
}
