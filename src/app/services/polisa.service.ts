import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Polisa } from '../models/polisa';

@Injectable({
  providedIn: 'root'
})
export class PolisaService {
  private apiUrl = 'http://localhost:8080/polisas';
  
  constructor(private http:HttpClient, private authService: AuthService) { }

  getAllByUsername(username: string): Observable<Polisa[]> {
    const token = this.authService.getToken();
    
    if (!token) {
      throw new Error('Token nije prisutan'); 
    }
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
    });

    return this.http.get<Polisa[]>(this.apiUrl + "/" + username, { headers });
  } 
}
