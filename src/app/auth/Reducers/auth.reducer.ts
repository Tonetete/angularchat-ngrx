import * as AuthActions from '../Actions/auth.actions';
import { AuthActionTypes } from '../Actions/auth.actions';

export interface State {
  user: Array<any>;
  tokens?: Array<any>;
  error?: string;
  isLoading?: boolean;
}

const initialState: State = {
  user: [],
  tokens: [],
  error: '',
  isLoading: false,
};

export const AuthReducer = (
  state = initialState,
  action: AuthActions.actions
) => {
  switch (action.type) {
    case AuthActionTypes.LoggedUser:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      };
    case AuthActionTypes.LoginUser:
      return {
        ...state,
        isLoading: true,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const getAuthState = (state: State) => state.user;
export const getAuthAction = (action: any) => action.payload;
export const getAuthLoading = (state: State) => state.isLoading;
export const getAuthError = (state: State) => state.error;
