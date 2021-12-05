import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  logo: string;
  constructor( public router: Router,
               private api : ApiService) { }

ngViewWillEnter() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/user-profile');
    }
  }

  ngOnInit(): void {
  }
  async login() {
      if (this.loginForm.status === 'INVALID') {
          alert('Please fill the required fields!');
        return;
      }
      this.api.login(this.loginForm.value).subscribe(
        async data => {
          console.log(data)
          if (data['message'] != 'ok') {
            
            alert ('Invalid Username or password');
          }
          else {
            this.loginForm.reset();
            localStorage.setItem('userID', data['_id']);
            localStorage.setItem('token', data['token']);
            localStorage.setItem('user', data['user']);
            console.log(data['_id'])
            console.log(data['token'])
            this.router.navigateByUrl('/user-profile');
          }
        }
      );
    }
}
