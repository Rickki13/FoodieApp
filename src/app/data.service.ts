import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "./interfaces/users.interface";
import {OneRecipe} from "./interfaces/recipe.interface";
import {CreateRecipe} from "./interfaces/recipe-create.interface";
import {Posts} from "./interfaces/posts.interface";
import {Auth} from "./store/model/auth.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  role: 'guest'| 'user' | 'admin' = 'guest';

  private apiUrl = 'https://ea-backend.wckz.space';

  getRecipe(id: number): Observable<OneRecipe> {
    return this.httpClient.get<OneRecipe>(`${this.apiUrl}/posts/${id}`);
  }

  getAllPosts(): Observable<Posts[]> {
    return this.httpClient.get<Posts[]>(`${this.apiUrl}/posts`);
  }

  auth(userLogin: string, userPassword: string): Observable<Auth> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: userLogin,
      password: userPassword
    };

    return this.httpClient.post<Auth>(`${this.apiUrl}/users/login`, body, {
      headers: headers
    });
  }

  register(userEmail: string, userPassword: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      email: userEmail,
      password: userPassword,
    };

    return this.httpClient.post<Auth>(`${this.apiUrl}/users/register`, body, {
      headers: headers
    });
  }

  getAllUsers(token: string): Observable<Users[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<Users[]>(this.apiUrl + '/users', {
      headers: headers,
    });
  }

  sendPost(token: string, post: CreateRecipe) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(this.apiUrl + '/posts', post, {
      headers: headers,
    });
  }

  patchPost(token: string, id: number, post: CreateRecipe) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.patch(this.apiUrl + '/posts/' + id, post, {
      headers: headers,
    });
  }

  deletePost(token: string, id: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete(this.apiUrl + '/posts/' + id, {
      headers: headers,
    });
  }
}
