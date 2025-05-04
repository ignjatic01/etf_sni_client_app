import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipOsiguranja } from '../models/tip-osiguranja';
import { PolisaDto } from '../models/polisa-dto';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TipOsiguranjaService } from '../services/tip-osiguranja.service';
import { PolisaCreated } from '../models/polisa-c';

@Component({
  selector: 'app-polisa-create',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './polisa-create.component.html',
  styleUrl: './polisa-create.component.css'
})
export class PolisaCreateComponent {
  insuranceForm!: FormGroup;
  showPayment = false;
  tips: TipOsiguranja[] = [];
  polisa: PolisaDto | undefined;
  iznosNaplate: number = 0;

  constructor( private fb: FormBuilder, private tipOsiguranjaService: TipOsiguranjaService, private router: Router, private polisaC: PolisaCreated) { }

  async ngOnInit() {
    
    this.insuranceForm = this.fb.group({
      tipOsiguranjaId: [null, Validators.required],
      iznosOsiguranja: [null, [Validators.required, Validators.min(100)]],
      trajanje: [null, [Validators.required, Validators.min(1)]],
    });

    this.tipOsiguranjaService.getAll().subscribe(data => {
      console.log(data);
      this.tips = data;
    });
  }

  onSubmit(): void {
    if (this.insuranceForm.valid) {
      const formValue = { ...this.insuranceForm.value };
      let tipOs: TipOsiguranja | undefined;
      for(let tip of this.tips) {
        if(tip.id == parseInt(formValue.tipOsiguranjaId))
          tipOs = tip;
      }
      
      if(tipOs) {
        this.polisa = {
          tipOsiguranja: tipOs,
          iznosOsiguranja: formValue.iznosOsiguranja,
          trajanje: formValue.trajanje
        };
        this.iznosNaplate = this.polisa.iznosOsiguranja * this.polisa.tipOsiguranja.rizik;
        this.polisaC.setPolisa(this.polisa);
        this.router.navigate(['/payment']);
      }
      else {
        alert("Greska");
      }
    }
  }
}
