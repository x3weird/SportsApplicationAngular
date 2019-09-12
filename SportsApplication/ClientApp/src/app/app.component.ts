import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  check: Boolean;
  ngOnInit() {
  }

  constructor(private router: Router, private service: UserService) {}

  title = 'ClientApp';

  onLogout() {
    localStorage.removeItem('token');
    this.service.logOut().subscribe(
      () => this.router.navigate(['/login']),
      (err) => console.log(err)
    );

  }
}

