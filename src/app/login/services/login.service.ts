import { Injectable } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient) {}

  signInWithGoogle(): Observable<any> {
    return new Observable(observer => {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleUser => {
        // Extract token or user details from googleUser
        console.log(googleUser)
        const token = googleUser.idToken;
        // Send this token to the observer
        observer.next(token);
        observer.complete();
      }).catch(error => {
        observer.error(error);
        console.log(error, "error")
      });
    });
  }

  sendToBackend(token: string): Observable<any> {
    // Implement the API call to your backend
    return of({message: "success", token: 'token-string'})
    // return this.http.post('YOUR_BACKEND_URL/api/auth/google', { token: token });
  }
}
