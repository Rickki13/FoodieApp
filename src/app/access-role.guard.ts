import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { DataService } from "./data.service";
import { Observable } from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AccessRoleGuard implements CanActivate {
  constructor(
    private dataService: DataService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiredRole = route.data['requiredRole'] as 'guest' | 'user' | 'admin';
    if (requiredRole === 'user') {
      if (this.dataService.role === 'user' || this.dataService.role === 'admin') {
        return true;
      }
    } else if (requiredRole === 'admin') {
      if (this.dataService.role === 'admin') {
        return true;
      }
    }

    return this.router.parseUrl('/access-denied');
  }
}

