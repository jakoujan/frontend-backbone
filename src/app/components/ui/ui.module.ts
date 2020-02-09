import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { LeadingZerosPipe } from './pipes/leading-zeros.pipe';
import { UserPipe } from './pipes/user.pipe';
import { BooleanPipe } from './pipes/boolean.pipe';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';



@NgModule({
  declarations: [
    ToastContainerComponent,
    ConfirmationDialogComponent,
    FieldErrorDisplayComponent,
    LeadingZerosPipe,
    UserPipe,
    BooleanPipe,
    MessageDialogComponent
  ],
  providers: [
    NgxImageCompressService, NgbModalConfig
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
  ],
  exports: [
    ToastContainerComponent,
    ConfirmationDialogComponent,
    FieldErrorDisplayComponent,
    LeadingZerosPipe,
    UserPipe,
    BooleanPipe
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    MessageDialogComponent
  ]
})
export class UiModule {
  constructor(config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
}
