import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent implements OnInit {
  errorMessage: string = ''; 
  successMessage: string = '';
  username: string = '';

  constructor(private korisnikService: KorisnikService, private formBuilder: FormBuilder, private router: Router) { }
  
    public form: FormGroup = this.formBuilder.group({
      kod: [null, Validators.required]
    });

    ngOnInit() {
      this.username = sessionStorage.getItem('username_for_verification') || '';
    }
  
    public verify()
    {
      const data = {
        username: this.username,
        code: this.form.value.kod
      };
      this.korisnikService.verifyCode(data).subscribe(
        (response) => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('auth_token_full', JSON.stringify(response));
          localStorage.setItem('pendingVerification', 'false');
          this.successMessage = `Dobrodošao ${response.firstName} ${response.lastName}`;
          this.errorMessage = '';
          this.router.navigate(['/polise']);
        },
        (error) => {
          console.error('Greška prilikom prijave:', error.message);
          this.errorMessage = "Nepravilan kod za verifikaciju";
          this.successMessage = '';
        }
      );
      this.form.reset();
    }
}
