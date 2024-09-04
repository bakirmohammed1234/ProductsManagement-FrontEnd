import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

   loginFrom!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void {
        this.loginFrom=this.fb.group(
          {username: this.fb.control(""),
            password: this.fb.control("")
          }
        );
  }

  handleLogin(){
       let username=this.loginFrom.value.username;
       let password=this.loginFrom.value.password;
       this.authService.login(username,password).subscribe({
        next: (appUser)=>{
           this.authService.authenticateUser(appUser).subscribe({
                 next: (data)=>{
                  this.router.navigateByUrl("/admin");
                 }
           })
        }
       })
  }


}
