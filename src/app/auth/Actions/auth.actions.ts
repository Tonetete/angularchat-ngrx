import { IUser } from 'src/app/interfaces/IUser';
import { IActionWithPayload } from '../../reducers/reducer';

export const AuthActionTypes = {
  LoggedUser: '[Auth] LOGGED_USER',
  LoginUser: '[Auth] LOGIN_USER',
  LoginUserError: '[Auth] LOGIN_USER_ERROR',
  LoggedIn: '[Auth] LOGGED_IN',
  LogoutAuth: '[Auth] LOGOUT_USER',
};

export class LoggedIn implements IActionWithPayload {
  readonly type = AuthActionTypes.LoggedIn;
  constructor(public payload: { isLogin: boolean }) {}
}

export class LoggedUser implements IActionWithPayload {
  readonly type = AuthActionTypes.LoggedUser;
  constructor(public payload: any) {}
}

export class LogoutAuth implements IActionWithPayload {
  readonly type = AuthActionTypes.LogoutAuth;
  constructor(public payload: { isLogin: boolean }) {}
}

export class LoginUser implements IActionWithPayload {
  readonly type = AuthActionTypes.LoginUser;
  constructor(public payload: { user: IUser }) {}
}

export class LoginUserError implements IActionWithPayload {
  readonly type = AuthActionTypes.LoginUserError;
  constructor(public payload: { error: string }) {}
}

export type actions = LoggedIn | LogoutAuth | LoginUser | LoggedUser;
