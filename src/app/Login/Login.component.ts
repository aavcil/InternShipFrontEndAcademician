import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) { }
  loginUser: any = {};
  ngOnInit() {

    if (this.authService.loggedIn()) {
      this.route.navigateByUrl('/home');
    }
  }

  login() {
    this.authService.login(this.loginUser);
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
}

