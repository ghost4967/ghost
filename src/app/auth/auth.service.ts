import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { auth } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { User } from './../models/user';
import { RoleValidator } from './helpers/roleValidator';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RoleValidator{
  userData: any; // Save logged in user data
  sendEmailToVerifyEmail: boolean = false;
  public user$: Observable<User>;
  readonly userNotRegister: string =
    "There is no user record corresponding to this identifier. The user may have been deleted.";
  readonly invalidUser: string = 'The password is invalid or the user does not have a password.';
  readonly emailUsed: string = 'The email address is already in use by another account.';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService
  ) {
    super();
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userData = user;
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

  /**
   * Sign in with google
   */
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.setUserData(user);
      this.notificationSuccess("Bienvenido");
      return user;
    } catch (error) {
      this.notificationError(error);
    }
  }

  /**
   * Sign in with email/password 
   */
  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      if (this.isLoggedIn(result.user)) {
        this.setUserData(result.user);
        this.notificationSuccess("Bienvenido");
        localStorage.setItem("user", JSON.stringify(result.user));
        this.router.navigate(["product"]);
      } else {
        localStorage.removeItem("user");
        this.notificationError(
          `Verifique su correo electrónico <b>${result.user.email}</b> y active su cuenta.`
        );
        this.router.navigate(["/auth/sign-in"]);
      }
      return result.user;
    } catch (error) {
      if (error.message === this.userNotRegister) {
        this.notificationError(
          'No hay registro de usuario correspondiente a este correo electronico.'
        );
        this.router.navigate(["/auth/sign-in"]);
      } else if (error.message === this.invalidUser) {
        this.notificationError('El correo electronico o contraseña no es válida.');
      }
      localStorage.removeItem("user");
    }
  }

  /**
   * Sign up with email/password
   * @param email the new user
   * @param password the new user
   */
  async signUp(email: string, password: string, sendVerification: boolean = true) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if(sendVerification){
            this.sendVerificationMail();
          }
          this.setUserData(result.user);
        });
    } catch (error) {
      if (error.message === this.emailUsed) {
        this.notificationError('La dirección de correo electrónico ya está en uso por otra cuenta.');
      }
    }
  }

  /**
   * Reset Password
   * @param email the user
   */
  async resetPassword(email: string): Promise<void> {
    try {
      this.notificationSuccess(
        `Hemos enviado un correo a <b>${email}</b> para que pueda cambiar su contrasenia`
      );
      this.router.navigate(["/auth/sign-in"]);
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.notificationError(error);
    }
  }

  /**
   * Send email verfificaiton when new user sign up
   */
  async sendVerificationMail() {
    try {
      (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(["/auth/verify-email-address"]);
      this.notificationSuccess("Correo enviado exitosamente.");
    } catch (error) {
      this.notificationError(error.message);
    }
  }

  /**
   * Returns true when user is looged in and email is verified
   * @param user current user logged
   */
  isLoggedIn(user: User): boolean {
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /**
   * Retunr the current user that is logged
   */
  currentUser() {
    return this.afAuth.authState.pipe(map((auth) => auth));
  }

  /**
   * Sign out
   */
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

  private setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: user.role !== 'ADMIN' ? 'USER': 'ADMIN'
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
