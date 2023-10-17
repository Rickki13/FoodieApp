import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  role: 'guest'| 'user' | 'admin' = 'guest'
  constructor() { }

}
