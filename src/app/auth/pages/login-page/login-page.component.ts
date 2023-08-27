import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../interface/user.interface";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
  }


  onLogin(): void {
    this.authService.login('asdasd', 'asdasd')
        .subscribe(
            user => {
              console.log(user)
              this.router.navigate(['/']).then()
            }
        )
  }

  logout(): void {
    localStorage.removeItem('token')
  }

}
