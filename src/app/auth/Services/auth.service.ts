import { Injectable } from '@angular/core';

import { from, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IUser } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userFake: IUser = {
    email: 'example@gmail.com',
    password: '123456',
    username: 'example',
  };

  constructor() {}

  // fake login
  login(user: IUser): Observable<any> {
    const toSend = {
      isLoading: false,
      error: true,
      user: { ...user },
    };

    if (JSON.stringify(user) === JSON.stringify(this.userFake)) {
      toSend.isLoading = true;
      toSend.error = false;
    } else {
      return throwError('Invalid username or password');
    }
    return of(toSend).pipe(delay(5000));
  }
}
