import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (this.isLoggedIn) {
        this.setUserDataVerifycated(result.user);
        this.notificationSuccess("Bien venido");
        this.router.navigate(["product"]);
      } else {
        localStorage.removeItem("user");
        this.notificationError(
          "Verifique su correo electrónico y active su cuenta."
        );
        this.router.navigate(["product"]);
      }
      return result;
    }  catch (error) {
      console.log(error);
      console.log('mensajee del error-------',error.message);
      this.router.navigate(["product"]);
      this.notificationError(error.message);
    }
  }

  // Sign up with email/password
  signUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async resetPassword(email: string): Promise<void> {
    try {
      this.notificationSuccess(`Hemos enviado un correo a <b>${email}</b> para que pueda cambiar su contrasenia`);
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  // Send email verfificaiton when new user sign up
  async sendVerificationMail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      this.router.navigate(['/auth/verify-email-address']);
    });
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Retunr the current user that is looged
  currentUser() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user._id}`
    );
    const userData: User = {
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  //Sign out
  async signOut(): Promise<void> {
    const result = await this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.notificationSuccess('Sesión cerrada')
      this.router.navigate(['/']);
    });
    return result;
  }

  private setUserDataVerifycated(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user._id}`
    );
    const userData: User = {
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  private notificationSuccess(message: string) {
    const from = "top";
    const align = "center";
    this.toastr.success(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }

  private notificationError(message: string) {
    const from = "top";
    const align = "center";
    this.toastr.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: 4000,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }
}
