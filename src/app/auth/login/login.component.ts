import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    const savedForm = window.localStorage.getItem('saved-login-form');

    if (savedForm) {
      const loadedFormData = JSON.parse(savedForm);
      const savedEmail = loadedFormData.email;
      // this.form().setValue({email: savedEmail});
      setTimeout(() => {
        this.form().controls['email'].setValue(savedEmail);
      },1);
    }

    afterNextRender(() => {
      console.log('afterNextRender');
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
        }
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe()
      })
    });
  }

  onSubmit(formData: NgForm) {
    if (formData.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    formData.reset();
  }
}

