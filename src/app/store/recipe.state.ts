import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {RecipeIngredientsUpdate, RecipeStepsUpdate} from "./model/recipe.model";

@State<string[]>({
  name: 'RecipeState',
  defaults: []
})
@Injectable()
export class RecipeState {
  @Selector()
  static getRecipe(state: string[]) {
    return state;
  }

  @Action(RecipeIngredientsUpdate)
  recipeIngredientsUpdate(ctx: StateContext<string[]>, action: RecipeIngredientsUpdate) {
    if (ctx.getState().includes(action.payload)) {
      const state = ctx.getState();
      const filterIngredients = state.filter(
        (ingredient) => ingredient !== action.payload
      );
      ctx.setState(filterIngredients);
    } else {
      ctx.setState([...ctx.getState(), action.payload]);
    }
  }

  @Action(RecipeStepsUpdate)
  recipeStepsUpdate(ctx: StateContext<string[]>, action: RecipeStepsUpdate) {
    if (ctx.getState().includes(action.payload)) {
      const state = ctx.getState();
      const filterSteps = state.filter(
        (steps) => steps !== action.payload
      );
      ctx.setState(filterSteps);
    } else {
      ctx.setState([...ctx.getState(), action.payload]);
    }
  }
}
