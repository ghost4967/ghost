import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanSuperAdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && this.authService.isSuperAdmin(user)),
      tap((isSuperAdmin) => {
        if (!isSuperAdmin) {
          window.alert('Acceso denegado. Debe tener permiso para administrar datos.');
        }
      })
    );
  } 
}
