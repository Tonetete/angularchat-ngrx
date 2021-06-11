import { environment } from '../../environments/environment';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  Action,
} from '@ngrx/store';

import { RouterStateUrl } from '../shared/utils';

import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from '../auth/Reducers/auth.reducer';

export interface IActionWithPayload extends Action {
  payload: any;
}

export interface State {
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State | any, IActionWithPayload> = {
  auth: fromAuth.AuthReducer,
  router: fromRouter.routerReducer,
};

export const logger =
  (reducer: ActionReducer<State>): ActionReducer<State> =>
  (state: State | undefined, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };

export const metaReducers: MetaReducer<State, any>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getAuth = createSelector(getAuthState, fromAuth.getAuthState);

export const getAuthLoading = createSelector(
  getAuthState,
  fromAuth.getAuthLoading
);

export const getAuthError = createSelector(getAuthState, fromAuth.getAuthError);
