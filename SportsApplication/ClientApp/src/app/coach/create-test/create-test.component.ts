import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: UserService) { }

    testForm = this.fb.group({
    Id: ['0', [Validators.required]],
    TestType: ['', [Validators.required]],
    Date: ['', [Validators.required]],
    CoachId: [''],
    Count: ['0', [Validators.required]],
  });

  ngOnInit() {
  }

  onSubmit() {
    this.testForm.value.CoachId = localStorage.getItem('Id');
    this.service.createTest(this.testForm.value).subscribe(
      (data: any) => {
                        console.log(data);
                        this.service.navigateToHome();
                     },
      (err:any) => console.log(err)
    );

  }

}
