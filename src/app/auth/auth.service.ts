import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
        )
    }
}