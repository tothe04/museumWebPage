// profile.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  //private apiUrl = 'https://your-api-url'; // Update with your API URL
  private url = environment.hostUrl;

  constructor(private http: HttpClient) { }

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${userId}`);
  }

  updateUserProfile(userId: string, userData: any): Observable<any> {
    return this.http.put(`${this.url}/users/${userId}`, userData);
  }
}
