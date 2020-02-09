import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { PersistenceModule } from 'angular-persistence';
import { ModulesModule } from './modules/modules.module';
import { UiModule } from './components/ui/ui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainNavComponent } from './components/ui/main-nav/main-nav.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/security/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DashboardComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    PersistenceModule,
    PdfViewerModule,
    AngularEditorModule,
    UiModule,
    NgbModule,
    ModulesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {

}
