import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Kredencijali } from '../models/kredencijali';
import { Korisnik } from '../models/korisnik';
import { KorisnikFull } from '../models/korisnikFull';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { KorisnikKlijent } from '../models/korisnik-klijent';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private apiUrl = 'http://localhost:8080/korisniks';

  constructor(private http:HttpClient, private authService: AuthService, private router: Router) { }

  getAll(): Observable<KorisnikFull[]> {
    const token = this.authService.getToken();

    if (!token) {
      throw new Error('Token nije prisutan'); 
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
    });
    return this.http.get<KorisnikFull[]>(this.apiUrl, { headers });
  }

  login(kredencijali: Kredencijali): Observable<any> {
    const loginData = {
      username: kredencijali.username,
      password: kredencijali.password
    };
    
    return this.http.post<any>(this.apiUrl + "/login", loginData, { withCredentials: true }).pipe(
      tap(response => {
        localStorage.setItem('pendingVerification', 'true');
        this.router.navigate(['/verify-code']);
      }),
      catchError((error) => {
        if (error.status === 401) {
          throw new Error('Neispravni kredencijali');
        }
        throw new Error('Došlo je do greške');
      })
    );
  }

  verifyCode(data: { username: string; code: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/verify-code", data, { withCredentials: true });
  }

  registerKlijent(KorisnikKlijent: KorisnikKlijent): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/register/klijent", KorisnikKlijent);
  }
    
}
