import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && this.authService.isAdmin(user)),
      tap((isAdmin) => {
        if (!isAdmin) {
          window.alert('Acceso denegado. Debe tener permiso para administrar datos.');
        }
      })
    );
  }
  
}
