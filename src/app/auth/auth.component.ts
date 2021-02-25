import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    
    isLoginMode = true;
    isLoading = false;
    error: string = '';

    constructor(
        private authServices: AuthService,
        private router: Router
    ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true; 

        let authObservable: Observable<AuthResponseData>

        if (this.isLoginMode) {
            authObservable = this.authServices.login(email, password);
        } else {
            authObservable = this.authServices.signUp(email, password);
        }

        authObservable.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, 
        errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });

        form.reset();
    }
}