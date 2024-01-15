import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserLoginResponse} from "../contracts";

@Injectable({providedIn: 'root'})
export class AuthService {
  $login = new BehaviorSubject<UserLoginResponse | undefined>(undefined);
}
