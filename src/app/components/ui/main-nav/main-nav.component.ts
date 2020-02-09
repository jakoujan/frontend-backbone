import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from "./module";
import { PersistenceService, StorageType } from 'angular-persistence';
import { SecurityService } from 'src/app/services/security.service';
import { Subscription } from 'rxjs';
import { constants } from 'src/environments/environment';
import { IUser } from 'src/app/interfaces/user';
import { MODULES } from 'src/app/modules';
import { IModule } from 'src/app/interfaces/module';
import { Session } from 'src/app/interfaces/session';


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isNavbarCollapsed: boolean = true;
  isMenuHidden: boolean = false;
  modules: Array<Module> = [];
  private moduleAccesor: Subscription;
  user: IUser;
  title = constants.APPLICATION_TITLE;
  alt = constants.APPLICATION_TITLE_ALT;

  constructor(private router: Router, private persistenceService: PersistenceService, private securityService: SecurityService) { }

  ngOnInit() {
    this.moduleAccesor = this.securityService.setUserData().subscribe(user => {
      this.user = user;
      this.modules = this.buildMenu(user.modules);
    });
    const session: Session = this.persistenceService.get(constants.SESSION, StorageType.SESSION);
    if (session) {
      this.user = session.user;
      this.modules = this.buildMenu(this.user.modules);
    }

  }

  private buildMenu(permissions: Array<IModule>): Array<Module> {
    const modules: Array<Module> = [];

    MODULES.forEach(module => {
      let permission: IModule;
      if (permissions.some(p => {
        permission = p;
        return p.id === module.id
      })) {
        module.submodules = module.submodules.filter(sm => {
          return permission.submodules.some(s => sm.id === s.id);
        });
        modules.push(module);
      }
    });

    return modules;
  }

  ngOnDestroy() {
    this.moduleAccesor.unsubscribe();
  }

  public goto(module: Module) {
    this.modules.forEach(m => {
      m.active = false;
    });

    module.submodules.some(sm => {
      if (sm.default) {
        this.router.navigate([sm.uri]);
        return true;
      }
    })
  }

  public toggleMenu() {
    this.isMenuHidden = !this.isMenuHidden;
  }

  public logout() {
    this.persistenceService.removeAll(StorageType.SESSION);
    this.router.navigate(['/login']);
  }

  public dashboard() {
    this.router.navigate(['/dashboard']);
  }
  public profile() {
    this.router.navigate(['administration/users/profile']);
  }

}
