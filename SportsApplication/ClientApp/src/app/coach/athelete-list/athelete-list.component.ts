import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athelete-list',
  templateUrl: './athelete-list.component.html',
  styleUrls: ['./athelete-list.component.css']
})
export class AtheleteListComponent implements OnInit {

  atheletes;
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.service.atheleteList().subscribe(
      (data: any) => this.atheletes = data
    );
  }

  onDelete(id: string) {

    if (confirm('Are you sure you want to delete ?')) {
      this.service.deleteAthlele(id).subscribe(
        () => document.location.reload()
      );

    }
  }

}
