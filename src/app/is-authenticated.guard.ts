
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class IsAuthenticatedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isLoggedIn$.pipe(
            tap(isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigate(['login']);
                }
            })
        )

    }
}
