import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { User } from './../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  sendEmailToVerifyEmail: boolean = false;
  public user$: Observable<User>;
  readonly userNotRegister: string =
    "There is no user record corresponding to this identifier. The user may have been deleted.";

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        console.log(user);
        if (user) {
          this.userData = user;
          console.log(user);
          localStorage.setItem("user", JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem("user"));
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
        return of(null);
      })
    );
  }

  // Sign in with email/password
  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.setUserData(result.user);
      if (this.isLoggedIn(result.user)) {
        this.setUserDataVerifycated(result.user);
        this.notificationSuccess("Bienvenido");
        localStorage.setItem("user", JSON.stringify(result.user));
        JSON.parse(localStorage.getItem("user"));
        this.router.navigate(["product"]);
      } else {
        localStorage.removeItem("user");
        this.notificationError(
          `Verifique su correo electrónico <b>${result.user.email}</b> y active su cuenta.`
        );
        this.router.navigate(["/auth/sign-in"]);
      }
    } catch (error) {
      if (error.message === this.userNotRegister) {
        this.notificationError(
          `No hay registro de usuario correspondiente a este correo electronico.`
        );
        this.router.navigate(["/auth/sign-in"]);
      } else {
        this.notificationError(
          `El correo electronico todavia no ha sido validado, hemos enviado de nuevo un correo para qeu valide su correo electronico.`,
          6000
        );
        this.sendVerificationMail();
      }
      localStorage.removeItem("user");
    }
  }

  // Sign up with email/password
  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.sendVerificationMail();
          this.setUserData(result.user);
        });
    } catch (error) {
      this.notificationError(error.message);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      this.notificationSuccess(
        `Hemos enviado un correo a <b>${email}</b> para que pueda cambiar su contrasenia`
      );
      this.router.navigate(["/auth/sign-in"]);
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  // Send email verfificaiton when new user sign up
  async sendVerificationMail() {
    try {
      (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(["/auth/verify-email-address"]);
      this.notificationSuccess("Correo enviado exitosamente.");
    } catch (error) {
      this.notificationError(error.message);
    }
  }

  // Returns true when user is looged in and email is verified
  isLoggedIn(user: User): boolean {
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Retunr the current user that is looged
  currentUser() {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
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
    try {
      const result = await this.afAuth.signOut().then(() => {
        localStorage.removeItem("user");
        this.notificationSuccess("Sesión cerrada");
        this.router.navigate(["/"]);
      });
      return result;
    } catch (error) {
      this.notificationError(error);
    }
  }

  private setUserDataVerifycated(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
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

  private notificationError(message: string, timeOut: number = 4000) {
    const from = "top";
    const align = "center";
    this.toastr.error(
      `<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">${message}</span>`,
      "",
      {
        timeOut: timeOut,
        enableHtml: true,
        closeButton: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-" + from + "-" + align,
      }
    );
  }
}
