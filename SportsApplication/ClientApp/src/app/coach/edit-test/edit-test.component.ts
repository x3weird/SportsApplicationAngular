import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {

  testId;
  obj;

  constructor(private service: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.testId = this.route.snapshot.paramMap.get('id');
    this.service.editTest(this.testId).subscribe(
       (data: any) =>  this.obj = data
     );


}

    onDelete(TestId)
    {
      if (confirm("Are you sure you want to delete this Test ?")) {
        this.service.deleteTest(TestId).subscribe(
          () => this.router.navigate(['/login']),
          (err: any) => console.log(err)
        );

      }

    }
}
