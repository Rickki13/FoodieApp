import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {FavoriteUpdate} from "./model/favorite.model";

@State<number[]>({
  name: 'FavoriteState',
  defaults: []
})
@Injectable()
export class FavoriteState {
  @Selector()
  static getFavorite(state: number[]) {
    return state;
  }

  @Action(FavoriteUpdate)
  favoriteUpdate(ctx: StateContext<number[]>, action: FavoriteUpdate) {
    if (ctx.getState().includes(action.payload)) {
      const state = ctx.getState();
      const filterFavorite = state.filter(
        (favorite) => favorite !== action.payload
      );
      ctx.setState(filterFavorite);
    } else {
      ctx.setState([...ctx.getState(), action.payload]);
    }
  }
}
