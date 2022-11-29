import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private router: Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
    
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let email_value = this.email.value;
      let pass_value = this.password.value;
      // console.log("email:", this.email.value);
      // console.log("password:", this.password.value);
      if (email_value == "admin@admin.com" && pass_value == "password") {
        sessionStorage.setItem("email", email_value);
        sessionStorage.setItem("bw_chartData", '');
        sessionStorage.setItem("cm_chartData", '');
        this.router.navigate(['pages/dashboard']);
      }
      // console.log(values);
    }
  }
}
