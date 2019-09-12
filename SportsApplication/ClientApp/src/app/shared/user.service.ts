import { Injectable, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { 'match': true };
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  emailMessage: string;
  readonly BaseURL = 'http://localhost:6600/api';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

    userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['' , Validators.required],
        confirmPassword: ['' , Validators.required]
      }, {validator: passwordMatcher })
    });

    save() {
      console.log(this.userForm);
    }

    setMessge(c: AbstractControl): void {
      this.emailMessage = '';
      if (c.touched || c.dirty && c.errors) {
        if (c.errors.required) {
          this.emailMessage = 'Please enter email';
        }
        if (c.errors.email) {
          this.emailMessage = 'Enter correct email';
        }
      }
    }

    register() {
      var body = {
        FirstName: this.userForm.value.firstName,
        LastName: this.userForm.value.lastName,
        UserName: this.userForm.value.userName,
        Email: this.userForm.value.email,
        Password: this.userForm.value.passwordGroup.password,
        ConfirmPassword: this.userForm.value.passwordGroup.confirmPassword
      }
      console.log(body);
      return  this.http.post(this.BaseURL + '/Account/Register', body);
    }

    login(formData){
      console.log(formData.value);
      return this.http.post(this.BaseURL + '/Account/Login', formData.value);
    }

    checkLogin(): boolean {
      if (localStorage.getItem('token') != null) {
        return true;
      } else {
        return false;
      }
    }

    navigateToHome(){
      if (localStorage.getItem('Role') === 'Coach') {
        this.router.navigateByUrl('/coach');
      } else {
        this.router.navigateByUrl('/athelete');
      }
    }

    testData() {
      return this.http.get(this.BaseURL + '/Home/TestData');
    }

    createTest(testForm) {
      return this.http.post(this.BaseURL + '/Test/createTest', testForm);
    }

    atheleteList() {
      return this.http.get(this.BaseURL + '/Athelete/AtheleteList');
    }

    deleteAthlele(id: string) {
      return this.http.delete(this.BaseURL + '/Athelete/' + id);
    }

    addNewAthelete(athelete: any) {
      return  this.http.post(this.BaseURL + '/Result/addAthelete', athelete);
    }

    addAthelete(athelete: any) {
      return  this.http.post(this.BaseURL + '/Athelete/addNewAthelete', athelete);
    }

    editTest(id) {
      return  this.http.get(this.BaseURL + '/Result/editTest/' + id);
    }

    editResult(id) {
      return  this.http.get(this.BaseURL + '/Result/editResult/' + id);
    }

    updateResult(model) {
      return this.http.post(this.BaseURL + '/Result/updateResult', model);
    }

    deleteResult(Id, TestId) {
      return this.http.delete(this.BaseURL + '/Result/deleteResult/' + Id + '/' + TestId);
    }

    deleteTest(TestId) {
      return this.http.delete(this.BaseURL + '/Test/deleteTest/'+ TestId);
    }

    getAddAthelete(id) {
      return this.http.get(this.BaseURL + '/Result/addAthelete/' + id);
    }

    getAtheleteData() {
      return this.http.get(this.BaseURL + '/Athelete/atheleteData/' + localStorage.getItem('Id'));
    }

    logOut() {
      return this.http.get(this.BaseURL + '/Account/logOut');
    }
}
