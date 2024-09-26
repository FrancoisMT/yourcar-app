import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userPath = 'http://localhost:8080/auth/login';
  public adminPath = 'http://localhost:8080/auth/admin/login';

  constructor(private http: HttpClient) { }

  loginUser(email: string): Observable<any> {
    return this.http.post(this.userPath, { email });  // Envoie un objet avec l'email
  }

  loginAdmin(email: string): Observable<any> {
    return this.http.post(this.adminPath, { email }); // Envoie un objet avec l'email
  }
}
