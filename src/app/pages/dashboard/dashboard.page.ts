import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { CalendarComponent } from './calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CalendarComponent]
})
export class DashboardPage implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }
}
