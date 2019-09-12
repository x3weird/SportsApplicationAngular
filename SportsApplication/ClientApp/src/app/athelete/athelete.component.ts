import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-athelete',
  templateUrl: './athelete.component.html',
  styleUrls: ['./athelete.component.css']
})
export class AtheleteComponent implements OnInit {

  atheleteData: any;
  constructor(private service: UserService) { }

  ngOnInit() {

    if (localStorage.getItem('Role') !== 'Athelete') {
      this.service.navigateToHome();
    }
    this.service.getAtheleteData().subscribe(
      (data: any) => this.atheleteData = data
    )
  }

}
