import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { prepareProfile } from 'selenium-webdriver/firefox';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home', icon: 'design_app', class: 'menuItems' },

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.Role == "0") {
      ROUTES.push(
        { path: '/students', title: 'Öğrenciler', icon: 'files_single-copy-04', class: 'menuItems' },
        { path: '/resource', title: 'Başvurular', icon: 'files_single-copy-04', class: 'menuItems' },
        { path: '/assignments', title: 'Atama Sonuçları', icon: 'shopping_tag-content', class: 'menuItems' },
        { path: '/systemSettings', title: 'Sistem Ayarları', icon: 'shopping_tag-content', class: 'menuItems' },

      );
    }
    if (this.Role == "1") {
      ROUTES.push(
        { path: '/myStudents', title: 'Öğrencilerim', icon: 'design_app', class: 'menuItems' },    
      );
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  logOut() {
    this.authService.logOut();
  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }
  get Role() {
    return this.authService.userGroup;
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
