import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/IUser';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers/reducer';
import * as AuthActions from '../Actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: IUser;
  error$ = this.store.select(fromAuth.getAuthError);
  isLoading$ = this.store.select(fromAuth.getAuthLoading);

  constructor(private store: Store<fromAuth.State>) {
    this.user = {
      email: 'example@gmail.com',
      password: '123456',
      username: 'example',
    };
  }

  ngOnInit(): void {}

  login() {
    if (this.user) {
      this.store.dispatch(
        new AuthActions.LoginUser({ user: { ...this.user } })
      );
    }
  }
}
