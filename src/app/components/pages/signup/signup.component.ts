import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.sass"]
})
export class SignupComponent implements OnInit {
	userForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.buildForm();
	}

	signup(): void {
		this.auth.signup(this.userForm.value);
		this.router.navigate(["/"]);
	}

	buildForm(): void {
		this.userForm = this.fb.group({
			firstName: ["", [Validators.required]],
			lastName: ["", [Validators.required]],
			email: ["", [Validators.required, Validators.email]],
			password: [
				"",
				[
					Validators.pattern(
						"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
					),
					Validators.minLength(6),
					Validators.maxLength(25)
				]
			],
			repeatPassword: [
				"",
				[
					Validators.pattern(
						"^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"
					),
					Validators.minLength(6),
					Validators.maxLength(25)
				]
			]
		});
		this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
		this.onValueChanged();
	}

	onValueChanged(data?: any) {
		if (!this.userForm) {
			return;
		}
		const form = this.userForm;
		for (const field in this.formErrors) {
			this.formErrors[field] = "";
			const control = form.get(field);
			if (control && control.dirty && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					this.formErrors[field] += messages[key] + " ";
				}
			}
		}
	}

	formErrors = {
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	};

	validationMessages = {
		firstName: {
			required: "First name is required."
		},
		lastName: {
			required: "Last name is required."
		},
		email: {
			required: "Email is required.",
			email: "Email must be a valid email"
		},
		password: {
			required: "Password is required.",
			pattern: "Password must be include at one letter and one number.",
			minlength: "Password must be at least 4 characters long.",
			maxlength: "Password cannot be more than 40 characters long."
		}
	};
}
