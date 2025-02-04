import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ emailIsNotUnique: true });

}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedFormData = JSON.parse(savedForm);
  initialEmailValue = loadedFormData.email;
}

@Component({
  selector: 'app-login-2',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component2.html',
  styleUrl: './login.component2.css',
})
export class LoginComponent2 implements OnInit {
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      asyncValidators: [emailIsUnique],
    }),
  });

  private destroyRef = inject(DestroyRef);

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }

  ngOnInit() {
    /* const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      this.form.patchValue({ email: loadedFormData.email }); */

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
