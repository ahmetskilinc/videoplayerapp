import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
	selector: "app-user-profile",
	templateUrl: "./user-profile.component.html",
	styleUrls: ["./user-profile.component.sass"]
})
export class UserProfileComponent implements OnInit {
	loading: boolean = true;
	user: any;
	constructor(private afAuth: AngularFireAuth, private router: Router) {}

	ngOnInit() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.user = user;
			} else {
				this.router.navigate(["/login"]);
			}
			this.loading = false;
		});
	}
}
