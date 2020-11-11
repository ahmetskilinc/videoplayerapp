import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
	providedIn: "root"
})
export class AuthGuard implements CanActivate {
	constructor(public afAuth: AngularFireAuth, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		this.afAuth.authState.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
			}
		});
		return true;
	}
}
