import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userFace: IUser = {
    email: 'example@gmail.com',
    password: '123456',
    username: 'example',
  };

  constructor() {}

  login(user: IUser): Observable<any> {
    let toSend = false;
    if (JSON.stringify(user) === JSON.stringify(this.userFace)) {
      toSend = true;
    }
    return of(toSend).pipe(delay(5000));
  }
}
