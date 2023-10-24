import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/Model/login';
import { ConfigureService } from '../../service/configure.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });
  warning = false;
  returnUrl?: string;

  loginmodel: Login = {
    userName: "",
    password: ""
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private config: ConfigureService,
    private login: LoginService
  ) {

    this.titleService.setTitle("Inventory | Login");
    this.config.Logout();

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    setInterval(() => {

      this.config.Logout();
    }, 3600000);
    this.loginmodel.userName = this.form.value.username.trim();
    this.loginmodel.password = this.form.value.password;

    this.login.getLogin(this.loginmodel).subscribe(res => {

      if (res.status == true) {
        localStorage.setItem("tokNum", res.token);
        localStorage.setItem("userName", res.userName);
        localStorage.setItem("userGroup", res.userGroup);

        this.router.navigate([this.returnUrl]);
      }
      else {
        this.warning = true;
      }
    }, err => {

      this.warning = true;

    });
  }
}
