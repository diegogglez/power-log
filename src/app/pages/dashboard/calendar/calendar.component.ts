import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
})
export class CalendarComponent  implements OnInit {
  public week: string[] = [
    'sunday', 
    'monday', 
    'tuesday', 
    'wendesday', 
    'thursday', 
    'friday', 
    'saturday'
  ];

  public months: string[] = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ];

  // Calendar params
  public date: Date = new Date();
  public year: number = this.date.getFullYear();
  public today!: number;
  public currentMonth!: number;
  public firstDayMonth!: number;
  public totalDaysMonth!: number[];

  constructor() { }

  ngOnInit() {
    this.getCalendarParams();
  }

  getCalendarParams() {
    this.today = this.date.getDate();
    this.currentMonth = this.date.getMonth();
    console.log(this.currentMonth)
    
    const firstDay = new Date(this.date.getFullYear(), this.currentMonth, 1);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    const monthDays = lastDay.getDate();
    const daysArr = new Array(monthDays).fill(0).map((n, index) => index + 1);
    
    this.firstDayMonth = firstDay.getDay();
    this.totalDaysMonth = daysArr;
  }
}
