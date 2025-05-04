import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipOsiguranja } from '../models/tip-osiguranja';
import { PolisaDto } from '../models/polisa-dto';
import { TipOsiguranjaService } from '../services/tip-osiguranja.service';
import { PolisaCreated } from '../models/polisa-c';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  card: any;
  cardElement: any;

  iznosNaplate: number = 0;
  polisa: PolisaDto | undefined;
  
  constructor(private http: HttpClient,private authService: AuthService, private router: Router, private polisaC: PolisaCreated) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51RIbHsD0c4l7gnzibB8BiT7fGGNb7ARPACMIUM5CPQ0OG1cGEsVWUrXZsUEo7IBX2hBYs3S1QBa2Hvk4LYF3JjIh001o3tEhF9');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
    this.polisa = this.polisaC.getPolisa();
    console.log(this.polisa);
    if(this.polisa)
    {
      this.iznosNaplate = this.polisa.iznosOsiguranja * this.polisa.tipOsiguranja.rizik;
    }
    else
    {
      this.router.navigate(["/polisa-create"]);
    }
  }

  

  async pay() {
    const { token, error } = await this.stripe.createToken(this.card);
    
    if (error) {
      console.error(error);
      alert('Greška pri kreiranju tokena.');
    } else {
      console.log(token);
      const userString = localStorage.getItem("auth_token_full");
      if(userString && this.polisa) {
        const user = JSON.parse(userString);
        console.log(user.username);
        const token2 = this.authService.getToken();
        if (!token2) {
          throw new Error('Token nije prisutan'); 
        }
            
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token2}`, 
        });

        this.http.post('http://localhost:8080/payment', { token: token.id, amount: (this.iznosNaplate * 100), username: user.username , 
          tipOsiguranja: this.polisa?.tipOsiguranja, iznosOsiguranja: this.polisa?.iznosOsiguranja, trajanje: this.polisa?.trajanje }, 
        { headers })
          .subscribe(response => {
            console.log(response);
            alert('Uplata uspjela!');
            this.router.navigate(['/polise']);
          }, err => {
            this.authService.logout();
            console.error(err);
            alert('Greška pri uplati.');
            this.router.navigate(['/login']);
          });
      }
      else {
        alert("Greska pri ucitavanju metapodataka uplate")
      }
    }
  }
}

