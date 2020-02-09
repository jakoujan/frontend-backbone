import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { IUser } from 'src/app/interfaces/user';
import { constants } from 'src/environments/environment';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Session } from 'src/app/interfaces/session';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidden: boolean = false;
  loginForm: FormGroup;
  title = constants.APPLICATION_TITLE;
  alt = constants.APPLICATION_TITLE_ALT;

  constructor(private formBuilder: FormBuilder, private securityService: SecurityService,
    private persistenceService: PersistenceService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });

    const session: Session = this.persistenceService.get(constants.SESSION, StorageType.SESSION);

    if (session !== undefined) {
      this.hidden = true;
    }
  }

  public login() {
    const user: IUser = {
      email: null,
      password: this.loginForm.controls.password.value,
      api_token: null,
      id: null,
      name: null,
      user: this.loginForm.controls.user.value,
      modules: null,
    }
    this.securityService.login(user).then(response => {
      if (response.code === constants.LOGIN_OK) {
        const session: Session = {
          user: response.fields.user,
          token: response.fields.token,
          csrf: response.fields.csrf
        }
        this.persistenceService.set(constants.SESSION, session, { type: StorageType.SESSION });

        this.securityService.updateUserData(response.fields.user);

        this.hidden = true;
        this.router.navigate(['/dashboard']);
      } else if (response.code === constants.LOGIN_NOT_OK) {
        this.toastService.show(response.message, { classname: 'bg-danger text-light', delay: 5000 });
      }
    });
  }

  

}
