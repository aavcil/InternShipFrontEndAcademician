import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { apiUrl } from '../app/global';
import { LoginUser } from '../models/LoginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { GetId } from 'src/models/GetId';
import { Academician } from 'src/models/Academician';
import { AlertifyService } from './Alertify.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService:AlertifyService
  ) { }
  path = apiUrl;
  userToken: any = null;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token"
  userId: any;
  Academician:Academician;
  private currentUserSubject: BehaviorSubject<Academician>;
  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient.post(this.path + "TeachersAuth/login", loginUser, { headers: headers })
      .subscribe(data => {
        this.router.navigateByUrl("/home");
        this.alertifyService.success("Sisteme Giriş Yapıldı.")
        this.saveToken(data["tokenString"]);
        this.saveTeacherId(data["teacher"].id);
        this.saveUserGroup(data["teacher"].userGroup);
        this.Academician=data["teacher"];
        this.userToken = data["tokenString"];
        location.reload();
      });
  }
  saveUserGroup(group){
    localStorage.setItem("userGroup", group);
  }
 
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  saveTeacherId(id) {
    localStorage.setItem("teacherId", id);
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.token);
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  get userGroup() {
    return localStorage.getItem("userGroup");
  }
  get user(){
    return this.Academician;
  }
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem("teacherId");
    localStorage.removeItem("userGroup");

    this.alertifyService.error("Sistemden çıkış yapıldı.");
    location.reload();

    this.router.navigateByUrl("/login");
    return true;
  }

}
