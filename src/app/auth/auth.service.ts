import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthResponseData {
    idToken: string;
    email: string; 
    refreshToken: string; 
    expiresIn: string; 
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY3p_U3GVJzwT2F_jSitD7Z2Q4QX0ILd8',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }

        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';

            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }

            switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists!';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Operation is not allowed!';
                    break;
            }

            return throwError(errorMessage);
        }))
    }
}