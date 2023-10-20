import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../data.service";
import {Router} from "@angular/router";
import {RegUser} from "../../interfaces/users.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private dataService: DataService, private router: Router) {}

  errData: boolean = false;
  register: RegUser = {
    email: '',
    password: '',
  };

  registerUser() {
    this.dataService
      .register(this.register.email, this.register.password)
      .subscribe({
        next: (value) => {
          alert(
            'Регистрация выполнена успешно! Перенаправление на главную страницу'
          );
          this.router.navigateByUrl('');
        },

        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.errData = true;
          }
        },
      });
  }

  ngOnInit() {}
}
