import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.sass"]
})
export class NavbarComponent implements OnInit {
	loggedIn: boolean;
	constructor(
		public afAuth: AngularFireAuth,
		private authService: AuthService
	) {}

	ngOnInit() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.loggedIn = true;
			} else {
				this.loggedIn = false;
			}
		});
	}

	logout() {
		this.authService.logout();
	}
}
