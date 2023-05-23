import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Workout } from 'src/app/models/workouts';
import { WorkoutModalComponent } from './workout-modal/workout-modal.component';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WorkoutsPage {

  refreshSuscription!: Subscription;
  workoutsSaved: Workout[] = [];
  workoutSelected: Workout = {
    id: '',
    name: '',
    exercises: []
  };

  constructor(
    private storage: StorageService,
    private alertController: AlertController,
    private modalController: ModalController
    ) {}

  ionViewWillEnter() {
    this.getWorkouts();
    this.refreshSuscription = this.storage.refresh.subscribe(() => {
      this.getWorkouts();
    })
  }

  async getWorkouts() {
    this.workoutsSaved = await this.storage.getWorkouts();
    console.log(this.workoutsSaved);
  }

  async openWorkoutModal(workout?: Workout) {
    const modal = await this.modalController.create({
      component: WorkoutModalComponent,
      componentProps: {
        workout,
      },
      breakpoints: [0, 0.5, 0.7, 1],
      initialBreakpoint: 0.7,
    });

    await modal.present();
  }

  async onClickDelete(item: Workout) {
    this.workoutSelected = item;
    console.log('delete', this.workoutSelected.id);

    const alert = await this.alertController.create({
      header: 'Do you want to delete this item?',
      message: 'Once you delete it, there is no going back.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteWorkout(this.workoutSelected);
          }
        }
      ],
    });

    await alert.present();
  }

  deleteWorkout(workout: Workout) {
    this.storage.deleteWorkout(workout);
    console.log('delete: ', workout);
  }

  async onClickEdit(item: Workout) {
    this.workoutSelected = item;
    console.log('Edit: ', this.workoutSelected);    

    const modal = await this.modalController.create({
      component: WorkoutModalComponent,
      componentProps: {
        item
      },
      breakpoints: [0, 0.5, 0.7, 1],
      initialBreakpoint: 0.7,
    });
    await modal.present();
  }

}
