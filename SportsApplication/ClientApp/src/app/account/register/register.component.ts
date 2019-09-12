import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.service.navigateToHome();
    }

    const emailControl = this.service.userForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.service.setMessge(emailControl)
    );
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          console.log('registration successful');
          this.service.userForm.reset();
          this.router.navigate(['/login']);
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                  alert('User Already Exists');
                break;

              default:
                  alert('Error!');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
