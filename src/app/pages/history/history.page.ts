import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { RMItem } from 'src/app/models/rms';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HistoryPage {

  refreshSuscription!: Subscription;
  rmHistory: RMItem[] = [];

  exerciseOptions: string[] = [
    'Squats',
    'Deadlift',
    'Bench Press',
    'Pull Ups',
    'Overhead Press'
  ];

  itemToDelete: any;

  constructor(
    private storage: StorageService,
    private alertController: AlertController
    ) { }
  
  ionViewWillEnter() {
    this.getRMs();
    this.refreshSuscription = this.storage.refresh.subscribe(() => {
      this.getRMs();
    })
  }

  async getRMs() {
    this.rmHistory = await this.storage.getRMs();
    console.log(this.rmHistory);
  }

  async filterExercises(exercise: string) {
    await this.getRMs();
    const rmHistoryFiltered = this.rmHistory.filter(rm => rm.exercise === exercise);
    this.rmHistory = rmHistoryFiltered;
    console.log('filter', exercise);
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
    await this.storage.deleteRM(item);
  }
}
