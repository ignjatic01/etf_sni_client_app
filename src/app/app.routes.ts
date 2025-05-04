import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { roleGuard } from './auth/role.guard';
import { VerifyComponent } from './verify/verify.component';
import { VerificationGuard } from './auth/verification.guard';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';
import { PolisaCreateComponent } from './polisa-create/polisa-create.component';
import { PolisaComponent } from './polisa/polisa.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "test", component: TestComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI', 'KLIJENT']}},
    {path: 'verify-code', component: VerifyComponent, canActivate: [VerificationGuard]},
    {path: "payment", component: PaymentComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI', 'KLIJENT']}},
    {path: "polisa-create", component: PolisaCreateComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI', 'KLIJENT']}},
    {path: "polise", component: PolisaComponent, canActivate: [roleGuard], data: {roles: ['ADMIN', 'ZAPOSLENI', 'KLIJENT']}},
    {path: 'register', component: RegisterComponent}
];
