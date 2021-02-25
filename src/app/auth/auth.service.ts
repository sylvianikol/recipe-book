import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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

    user = new BehaviorSubject<User>(null!); 

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError), 
                tap(resData => {
                    this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), 
            tap(resData => {
                this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }));    
    }

    logout() {
        this.user.next(null!);
        this.router.navigate(['/auth']);

    }

    handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );

        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        
        this.user.next(user); // emit as the currently logged in user
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData: { 

            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;

        } = JSON.parse(localStorage.getItem('userData')!);
        if (!userData) return;
        
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )

        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
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