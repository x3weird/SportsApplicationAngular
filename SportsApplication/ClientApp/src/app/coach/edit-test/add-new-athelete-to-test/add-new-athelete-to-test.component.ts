import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-athelete-to-test',
  templateUrl: './add-new-athelete-to-test.component.html',
  styleUrls: ['./add-new-athelete-to-test.component.css']
})
export class AddNewAtheleteToTestComponent implements OnInit {

  model;
  constructor(private service: UserService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }


  addAtheleteForm = this.fb.group({
    Name: ['', [Validators.required]],
    Data: ['', [Validators.required]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getAddAthelete(id).subscribe(
      (data) => { this.model = data;
                  this.model.testId = id;
                },
      (err) => console.log(err)
    )
  }

  onSubmit() {
    this.model.userId = this.addAtheleteForm.get('Name').value;
    this.model.data = this.addAtheleteForm.get('Data').value;
    this.service.addNewAthelete(this.model).subscribe(
      (data: any) => {if (data.status) {
          this.router.navigate(['/editTest/' + this.model.testId]);
        } else {
          alert("Athelete already exists");
        }
      }
    );
  }

}
