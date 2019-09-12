import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {

  tests: any;
  constructor(private service: UserService) { }

  ngOnInit() {

    this.service.testData().subscribe(
      (data: any) => this.tests = data
    );

  }

}
