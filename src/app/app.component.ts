import { Component } from "@angular/core";

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.sass"]
})
export class AppComponent {
	loggedIn = false;
	title = "MyVideoPlayerApp";

	constructor(private afAuth: AngularFireAuth, private router: Router) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.loggedIn = true;
				if (this.router.url == "/login") {
					this.router.navigate(["/"]);
				} else {
					this.router.navigate([this.router.url]);
				}
			} else {
				this.loggedIn = false;
			}
		});
	}
}
