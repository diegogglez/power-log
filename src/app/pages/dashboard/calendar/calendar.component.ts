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

  public date: Date = new Date();
  public today!: number;
  public firstDayMonth!: number;
  public totalDaysMonth!: number[];

  constructor() { }

  ngOnInit() {
    this.getCurrentDay();
    this.getFirstDayMonth(this.date.getFullYear(), this.date.getMonth());
    this.getTotalMonthDays();
  }

  getCurrentDay() {
    this.today = this.date.getDate();
    console.log(this.today)
  }

  getFirstDayMonth(year: number, month: number) {
    const monthStart = new Date(year, month, 1);
    this.firstDayMonth = monthStart.getDay();
  }

  getTotalMonthDays() {
    // the month number is 0-based. We need to sum 1 to the current month value to get que actual month
    const date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    const monthDays = date.getDate();
    const daysArr = new Array(monthDays).fill(0).map((n, index) => index + 1);
    this.totalDaysMonth = daysArr;
  }
}
