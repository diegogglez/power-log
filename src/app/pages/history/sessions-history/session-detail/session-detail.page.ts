import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Session } from 'src/app/models/workouts';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.page.html',
  styleUrls: ['./session-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SessionDetailPage implements OnInit {

  public session!: Session;
  public id: string = '';
  public totalSets!: number;
  public totalVolume!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSession(this.id);
  }

  async getSession(id: string) {
    this.session = await this.storageService.getSessionById(id);
    console.log(this.session); 
    this.calculateSets();  
    this.calculatevolume(); 
  }

  goBack() {
    this.router.navigate(['/home', 'history']);
  }

  calculateSets() {
    let totalSets = 0;
    for (let exercise of this.session.exercises) {
      const exerciseSetsDone = exercise.sets.filter((item: any) => item.done === true);
      console.log(exerciseSetsDone);
      totalSets += exerciseSetsDone.length;
    }
    this.totalSets = totalSets;
  }

  calculatevolume() {
    let totalVolume = 0;
    for (let exercise of this.session.exercises) {
      const exerciseSetsDone = exercise.sets.filter((item: any) => item.done === true);
      for (let set of exerciseSetsDone) {
        totalVolume += set.weight * set.reps;
      }
    }
    this.totalVolume = `${totalVolume}kg`;
  }
}
