import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') form: NgForm

  email: string;
  password: string;
  username: string;
  isReg = false;

  constructor(private userService: UserService, private router: Router){}

  login(): void {
    this.userService.login(this.email, this.password)
  }
  register(): void {
    if(this.isReg)
      this.userService.register(this.username, this.email, this.password)
    else
      this.isReg = true
  }
}
