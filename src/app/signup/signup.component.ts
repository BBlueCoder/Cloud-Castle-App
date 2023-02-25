import { SignUpValidators } from './custom-validators';
import { DuplicateUserError } from './../app-errors/duplicate-user-error';
import { UserService } from './../services/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private service: UserService) {
    this.form = fb.group({
      username: [
        '',
        Validators.required
      ],
      password: [
        '',
        [Validators.required,
        Validators.minLength(8)]
      ],
      confirmPassword: [
        '',
        Validators.required
      ]
    },
      {
        validator: SignUpValidators.passwordsShouldMatch
      })
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }

  signUp() {
    const user = { username: this.username?.value, password: this.password?.value };
    this.service.signup(user).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        if (error instanceof DuplicateUserError)
          this.form.setErrors({ duplicateUser: true });
        else
          console.log(error);
      }
    })
  }
}
