import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
	userForm: FormGroup;

	constructor(private fb: FormBuilder, private auth: AuthService) {}

	ngOnInit(): void {
		this.buildForm();
	}

	login(): void {
		this.auth.login(this.userForm.value);
	}

	buildForm(): void {
		this.userForm = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
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
		email: "",
		password: ""
	};

	validationMessages = {
		email: {
			required: "Email is required.",
			email: "Email must be a valid email"
		},
		password: {
			required: "Password is required."
		}
	};
}
