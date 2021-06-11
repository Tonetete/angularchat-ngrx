import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  LoggedIn,
  LoggedUser,
  LoginUser,
  LogoutAuth,
  LoginUserError,
} from '../Actions/auth.actions';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
  ) {}

  LoginUserError$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType<LoginUserError>(AuthActionTypes.LoginUserError),
      tap((value: any) => console.log(`LoggedAPI error ${value.payload}`)),
      map(() => {
        return {
          type: 'LOGIN_API_ERROR',
          payload: 'Email or password incorrect',
        };
      })
    );
  });

  LoginUser$ = createEffect((): Observable<Action> => {
    return this.actions$.pipe(
      ofType<LoginUser>(AuthActionTypes.LoginUser),
      tap((value: any) =>
        console.log(`Login User effect ${JSON.stringify(value)}`)
      ),
      map((action) => action.payload),
      exhaustMap((auth) => {
        return this.authService.login(auth.user).pipe(
          map((response) => new LoggedUser(response)),
          catchError((error) => of(new LoginUserError(error)))
        );
      })
    );
  });

  LoggedUser$ = createEffect(
    (): Observable<Action> => {
      return this.actions$.pipe(
        ofType<LoggedUser>(AuthActionTypes.LoggedUser),
        tap((value: any) => this.router.navigate(['/chats']))
      );
    },
    { dispatch: false }
  );
}
