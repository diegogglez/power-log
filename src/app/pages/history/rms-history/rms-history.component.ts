import { Session } from './../../../models/workouts';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RMItem } from 'src/app/models/rms';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-rms-history',
  templateUrl: './rms-history.component.html',
  styleUrls: ['./rms-history.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RmsHistoryComponent  implements OnInit {

  @Input() history!: any;

  public refreshSubscription!: Subscription
  public itemToDelete: any;
  public exerciseOptions: string[] = [
    'Squats',
    'Deadlift',
    'Bench Press',
    'Pull Ups',
    'Overhead Press'
  ];

  constructor(
    private storageService: StorageService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getRMs();
    this.refreshSubscription = this.storageService.refresh.subscribe(() => {
      this.getRMs();
    })
  }

  async getRMs() {
    this.history = await this.storageService.getRMs();
    console.log(this.history);
  }

  async presentAlert(item: any) {
    this.itemToDelete = item;
    console.log('alert');

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
            this.deleteItem(this.itemToDelete);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteItem(item: any) {
    await this.storageService.deleteRM(item);
  }

  async filterExercises(exercise: string) {
    await this.getRMs();
    const rmHistoryFiltered = this.history.filter((rm: any) => rm.exercise === exercise);
    this.history = rmHistoryFiltered;
    console.log('filter', exercise);
  }
}
