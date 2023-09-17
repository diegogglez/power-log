import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RmsHistoryComponent } from './rms-history/rms-history.component';
import { SessionsHistoryComponent } from './sessions-history/sessions-history.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    RmsHistoryComponent,
    SessionsHistoryComponent
  ]
})
export class HistoryPage {

  historyMode: string = 'rms'
  history: any[] = [];

  constructor() { }

  setHistoryMode(event: any) {
    const mode = event.detail.value;
    this.historyMode = mode;
    console.log(this.historyMode);
  }
}
