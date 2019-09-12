import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.css']
})
export class EditResultComponent implements OnInit {

  id;
  model: any;
  constructor(private route:ActivatedRoute, private service: UserService, private fb: FormBuilder,private router: Router) { }


  editResultForm = this.fb.group({
    Name: ['', [Validators.required]],
    Data: ['', [Validators.required]],
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.editResult(this.id).subscribe(
      (data) => {this.model = data; this.getResultData()},
      (error) => console.log(error)
    );
  }

  getResultData() {
    this.editResultForm.patchValue ({
      Name: this.model.userId,
      Data: this.model.data
    });
  }


  onSubmit() {
    this.model.userId = this.editResultForm.get('Name').value;
    this.model.data = this.editResultForm.get('Data').value;
    this.service.updateResult(this.model).subscribe(
      (data: any) => {
        if (!data.status) {
          alert('Athlelete already exists in the Test.');
        } else {
            this.router.navigate(['/editTest/' + this.model.testId]);
          }}
    );
  }

  onDelete(Id, TestId) {
    if (confirm("Are you sure you want to delete this test")) {
      this.service.deleteResult(Id, TestId).subscribe(
        (data) => this.router.navigate(['/login'])
      );
    }

  }

}
