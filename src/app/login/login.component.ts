import { UnauthorizedError } from './../app-errors/unauthorized-error';
import { NotFoundError } from './../app-errors/not-found-error';
import { AppError } from './../app-errors/app-error';
import { UserService } from './../services/user-service.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(fb: FormBuilder, private service: UserService) {
    this.form = fb.group({
      username: [
        '',
        Validators.required
      ],
      password: [
        '',
        Validators.required
      ]
    })
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  login() {
    const user = { username: this.username!.value, password: this.password!.value }
    this.service.login(user).subscribe({
      next: data => {
        console.log(data);
      },
      error: (error: AppError) => {
        if (error instanceof NotFoundError)
          this.form.setErrors({ userNotFound: true })
        else if (error instanceof UnauthorizedError)
          this.form.setErrors({ passwordIncorrect: true })
        else {
          alert("Error happened");
          console.log(error);
        }
      }
    })
  }
}
