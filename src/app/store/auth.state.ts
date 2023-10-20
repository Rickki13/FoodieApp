import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Auth, AuthUpdate} from "./model/auth.model";
import {Injectable} from "@angular/core";

@State<Auth>({
  name: 'AuthState',

  defaults: {
    access_token: null,
    role: 'guest',
    username: null,
    id: null,
    fullname: null,
    image: null,
    isAuth: false,
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static getToken(state: Auth) {
    return state.access_token;
  }

  @Selector()
  static getAuthObject(state: Auth) {
    return state;
  }

  @Selector()
  static getAuthRole(state: Auth): 'guest'| 'user' | 'admin' {
    return state.role;
  }

  @Action(AuthUpdate)
  updateUserModel(ctx: StateContext<Auth>, action: AuthUpdate) {
    ctx.patchState({
      access_token: action.payload.access_token,
      role: action.payload.role,
      username: action.payload.username,
      id: action.payload.id,
      fullname: action.payload.fullname,
      image: action.payload.image,
      isAuth: action.payload.isAuth,
    });
  }
}
