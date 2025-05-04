import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private korisnikService: KorisnikService, private formBuilder: FormBuilder, private router: Router) { }

  public form: FormGroup = this.formBuilder.group({
    ime: [null, Validators.required],
    prezime: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]]
  });

  public save()
  {
    this.korisnikService.registerKlijent(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = "Greška pri registraciji";
      }
    );
    this.form.reset();
  }
}
