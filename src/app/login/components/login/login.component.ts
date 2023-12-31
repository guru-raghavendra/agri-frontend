declare const google: any;

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (typeof google !== 'undefined') {
      this.initializeGoogleSignIn();
    } else {
      window.addEventListener('google-signin-loaded', this.initializeGoogleSignIn.bind(this));
    }
  }

  initializeGoogleSignIn() {
    console.log("inti")
    google.accounts.id.initialize({
      client_id: '44319179088-ih4r7b6jo25m4epblohftuu019gfur6g.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'), 
      { theme: 'outline', 
        size: 'large' ,
        text: 'continue_with',
        shape: 'pill',} // Customize as needed
    );
  }

  signInWithGoogle() {
    google.accounts.id.prompt(); // Triggers the Google Sign-In flow
  }

  handleCredentialResponse(response: any) {
    console.log(response)
    console.log('Encoded JWT ID token: ' + response.credential);
    // Send this token to your backend for validation and to create a JWT
    this.sendTokenToBackend(response.credential);
  }

  sendTokenToBackend(token: string) {
    // Implement the logic to send the token to your backend
    // This usually involves an HTTP POST request
  }
}