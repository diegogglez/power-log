import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Session } from 'src/app/models/workouts';
import { StorageService } from 'src/app/services/storage/storage.service';

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
  public totalDaysMonth!: any[];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.getCalendarParams();
    this.getSessions();
  }

  getCalendarParams() {
    this.today = this.date.getDate();
    this.currentMonth = this.date.getMonth();
    
    const firstDay = new Date(this.date.getFullYear(), this.currentMonth, 1);
    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    const monthDays = lastDay.getDate();
    const daysArr = new Array(monthDays).fill(0).map((n, index) => {
      const dayObj = {
        number: index + 1,
        fullDate: index < 10 
                    ? `0${index + 1}/${this.currentMonth + 1}/${this.year}` 
                    : `${index + 1}/${this.currentMonth + 1}/${this.year}`,
        trained: false
      };
      return dayObj;
    });    
    
    this.firstDayMonth = firstDay.getDay();
    this.totalDaysMonth = this.formatDaysArr(daysArr);
  }

  formatDaysArr(days: any) {
    const array1 = new Array(days[0]);
    const array2 = days;

    array2.shift();
    array1.push(array2);

    return array1;  
  }

  async getSessions() {
    const sessions: Session[] = await this.storageService.getSessions();
    const sessionsDates: string[] = sessions.map((session: Session) => session.date);
    
    this.totalDaysMonth[1].forEach((day: any) => {
      day.trained = sessionsDates.some(date => day.fullDate === date);
    })
  }
}
