import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccessService } from './services/access.service';


@Injectable({
  providedIn: 'root',
})
export class KeeperGuard implements CanActivate {
  constructor(private accessService: AccessService, private router: Router) {}
  canActivate(): boolean {
    if (this.accessService.checkUser()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}