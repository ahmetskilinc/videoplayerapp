import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";

import { Observable } from "rxjs";
import { Router } from "@angular/router";
import {
	AngularFirestoreDocument,
	AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	user: Observable<firebase.User>;

	constructor(
		private firebaseAuth: AngularFireAuth,
		private router: Router,
		private afs: AngularFirestore
	) {
		this.user = firebaseAuth.authState;
	}

	signup(credentials: EmailPasswordCredentials) {
		this.firebaseAuth
			.createUserWithEmailAndPassword(
				credentials.email,
				credentials.password
			)
			.then((result) => {
				this.addUserData(result.user, credentials);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addUserData(user, otherData) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`
		);
		const userData: any = {
			uid: user.uid,
			email: user.email,
			displayName: otherData.firstName + " " + otherData.lastName,
			photoURL: user.photoURL,
		};
		return userRef.set(userData, {
			merge: true,
		});
	}

	login(credentials: EmailPasswordCredentials) {
		this.firebaseAuth
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then((user) => {
				console.table(user);
				this.router.navigate(["/"]);
			})
			.catch((err) => {
				console.log("Something went wrong:", err.message);
			});
	}

	logout() {
		this.firebaseAuth.signOut().then((data) => {
			this.router.navigate(["/"]);
		});
	}
}

export class EmailPasswordCredentials {
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	repeatPassword?: string;
}
