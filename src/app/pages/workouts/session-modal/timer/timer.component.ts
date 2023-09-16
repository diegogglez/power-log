import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout/workout.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
})
export class TimerComponent  implements OnInit, OnDestroy {

  private timer: any;
  public hr: string = '00';
  public min: string = '00';
  public sec: string = '00';

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.start();
  }

  ngOnDestroy() {
    this.stop()
  }

  start() {
    this.timer = setInterval(() => {
      this.incrementTime();
    }, 1000)
  }

  stop() {
    clearInterval(this.timer);  
  }

  incrementTime() {
    let h = Number(this.hr);
    let m = Number(this.min);
    let s = Number(this.sec);

    s++;

    if (s === 60) {
      s = 0;
      m++;
    }

    if (m === 60) {
      m = 0;
      h++;
    }

    this.hr = this.formatTime(h);
    this.min = this.formatTime(m);
    this.sec = this.formatTime(s);

    const time = `${this.hr}:${this.min}:${this.sec}`
    this.workoutService.sessionTime.next(time); 
  }

  formatTime(value: number) {
    return value < 10 ? `0${value}` : value.toString();
  }
}
