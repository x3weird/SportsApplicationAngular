import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  emailMessage: string;
  pageTitle = 'User Login';


  constructor(private fb: FormBuilder, private service: UserService, private router: Router) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['' , Validators.required]
  });

  ngOnInit() {

    if (localStorage.getItem('token') != null) {
      this.service.navigateToHome();
    }
}

  onSubmit() {
    this.service.login(this.loginForm).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res);
        localStorage.setItem('Role', res.role);
        localStorage.setItem('Id', res.id);
        this.service.navigateToHome();
      },
      err => {
        if (err.status === 400) {
          alert('Incorrect username or password. Authentication failed.');
        } else {
          console.log(err);
        }
      }
    );
  }
}
