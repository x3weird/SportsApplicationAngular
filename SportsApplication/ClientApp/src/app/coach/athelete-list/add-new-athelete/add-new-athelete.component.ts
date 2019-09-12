import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-new-athelete',
  templateUrl: './add-new-athelete.component.html',
  styleUrls: ['./add-new-athelete.component.css']
})
export class AddNewAtheleteComponent implements OnInit {

  constructor(private service: UserService, private fb: FormBuilder, private router: Router) { }

  emailMessage: string;

  atheleteForm = this.fb.group({
    FirstName: ['', [Validators.required, Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.maxLength(50)]],
    UserName: ['', [Validators.required, Validators.minLength(3)]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['Defualt@123'],
    ConfirmPassword: ['Defualt@123']
  });

  ngOnInit() {

    const emailControl = this.atheleteForm.get('email');
    if (emailControl) {
      emailControl.valueChanges.pipe(
        debounceTime(1000)).subscribe(
              value => this.service.setMessge(emailControl));
    }

}

  onSubmit() {
    this.service.addAthelete(this.atheleteForm.value).subscribe(
      () => this.router.navigate(['/atheleteList'])
    );
  }

}
