import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: LoginService, private authService: SocialAuthService){}

  signIn(googleUser: any): void {
    console.log("in signin")
    this.service.signInWithGoogle().subscribe(
      token => {
        this.service.sendToBackend(token).subscribe(
          response => {
            console.log(response)
          },
          error => {
            console.log(error)
            // Handle errors from your backend
          }
        );
      },
      error => {
        // Handle sign-in error
      }
    );
  }

  title = 'angular-google';
  user:any;
  loggedIn:any;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }

}
