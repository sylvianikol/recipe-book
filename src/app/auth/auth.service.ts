import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    idToken: string;
    email: string; 
    refreshToken: string; 
    expiresIn: string; 
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));    
    }

    handleError(errorRes: HttpErrorResponse) {
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
            case 'INVALID_PASSWORD':
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Invalid email or password!';
                break;
        }

        return throwError(errorMessage);
    }
}