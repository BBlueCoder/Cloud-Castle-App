import { AbstractControl } from "@angular/forms";

export class SignUpValidators {
    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password');
        let confirmPassword = control.get('confirmPassword');

        if (password?.value !== confirmPassword?.value)
            return { passwordsDontMatch: true }

        return null;
    }
}