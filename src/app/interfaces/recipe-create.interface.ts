export interface CreateRecipe {
  title: string | null;
  body: string | null;
  tags: string | null;
  image: string | null;
  favorite: boolean | null;
  timeCooking: number | null;
  foodValue: FoodValue;
  additionalInformation: AdditionalInformation | null;
}

export interface FoodValue {
  calories: number | null;
  fats: number | null;
  carbohydrates: number | null;
  belki: number | null;
}

export interface AdditionalInformation {
  ingredients: string[];
  details: Detail[];
}

export interface Detail {
  title: string | null;
  body: string | null;
}


