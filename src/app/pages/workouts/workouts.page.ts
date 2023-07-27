import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Workout } from 'src/app/models/workouts';
import { WorkoutModalComponent } from './workout-modal/workout-modal.component';
import { WorkoutService } from 'src/app/services/workout/workout.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WorkoutsPage {

  public isWorkingoutSuscription!: Subscription;
  public refreshSuscription!: Subscription;
  public workoutsSaved: Workout[] = [];
  public startWorkingOutDisabled: boolean = false

  constructor(
    private storage: StorageService,
    private workoutService: WorkoutService,
    private alertController: AlertController,
    private modalController: ModalController
    ) {}

  ionViewWillEnter() {
    this.getWorkouts();

    this.refreshSuscription = this.storage.refresh.subscribe(() => {
      this.getWorkouts();
    })

    this.isWorkingoutSuscription = this.workoutService.isWorkingOut$.subscribe((isWorkingOut) => {
      this.startWorkingOutDisabled = isWorkingOut;
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

  onStartWorkout(workout: Workout) {
    this.workoutService.isWorkingOut$.next(true);
    this.workoutService.openSessionModal(workout);
  }
}
