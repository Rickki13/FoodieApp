export class RecipeIngredientsUpdate {
  static readonly type = '[Recipe]: Recipe Ingredients Update';
  constructor(public payload: string) {}
}

export class RecipeStepsUpdate {
  static readonly type = '[Recipe]: Recipe Steps Update';
  constructor(public payload: string) {}
}
