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

  launchSeed() {
    this.storage.workoutSeed();
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

  async onClickDelete(workout: Workout) {
    console.log('delete', workout);

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
            this.deleteWorkout(workout);
          }
        }
      ],
    });

    await alert.present();
  }

  async deleteWorkout(workout: Workout) {
    await this.storage.deleteWorkout(workout);
    console.log('deleted:', workout);
  }

  async onClickEdit(item: Workout) {
    console.log('Edit: ', item);    

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
