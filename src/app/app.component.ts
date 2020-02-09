import { Component, OnInit } from '@angular/core';
import { rxStompConfig, constants } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { ToastService } from './services/toast.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url: string;
  ws: string;

  constructor(public toastService: ToastService) {
    if (environment.production) {
      rxStompConfig.brokerURL = window.location.href.replace('http', 'ws') + rxStompConfig.brokerURL
    }
  }

  ngOnInit() {
    
  }

}
