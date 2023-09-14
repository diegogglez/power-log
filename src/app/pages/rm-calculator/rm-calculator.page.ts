import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { rpeChart } from './constants/rpe-chart';
import { RMItem } from 'src/app/models/rms';
import { v4 as uuidv4 } from 'uuid'
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-rm-calculator',
  templateUrl: './rm-calculator.page.html',
  styleUrls: ['./rm-calculator.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RmCalculatorPage implements OnInit {

  weight: any;
  reps: any;
  repsValid: boolean = false;
  rpe: any;
  rpeValid: boolean = false;
  units: string = 'kg';
  exercise: string = '';
  exerciseOptions: string[] = [
    'Squats',
    'Deadlift',
    'Bench Press',
    'Pull Ups',
    'Overhead Press'
  ];

  rm: any = 0;  
  rmMaxes: any[] = rpeChart[10];
  rmPercents: number[] = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40];

  constructor(private storageService: StorageService) {}

  ngOnInit() { }

  rmsSeed() {
    this.storageService.rmsSeed();
  }

  isValid() {
    this.reps > 0 && this.reps <= 12 
      ? this.repsValid = true 
      : this.repsValid = false;
    console.log(this.repsValid);
  }

  generateDate() {
    const date = new Date();
    const numericDate = date.toLocaleDateString();
    return numericDate;
  }

  guessRM() {
    const result = (this.weight / rpeChart[this.rpe][this.reps - 1].percent) * 100;
    this.rm = result.toFixed(2);

    console.log(typeof result);
    
    console.log(this.rm);
    console.log(rpeChart[this.rpe][this.reps - 1].percent);
  }

  async saveHistory() {
    const rmHistory = await this.storageService.getRMs();
    console.log(rmHistory);
    
    const date = this.generateDate();
    
    const rm: RMItem = {
      id: uuidv4(),
      rm: this.rm,
      weight: this.weight,
      units: this.units,
      reps: this.reps,
      rpe: this.rpe,
      exercise: this.exercise,
      date: date
    }
    this.storageService.addRM(rm);
  }

}
