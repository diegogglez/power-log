import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { RouterLink } from '@angular/router';
import { Session } from 'src/app/models/workouts';

@Component({
  selector: 'app-sessions-history',
  templateUrl: './sessions-history.component.html',
  styleUrls: ['./sessions-history.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class SessionsHistoryComponent  implements OnInit {

  @Input() history!: any;
  public itemToDelete: any;
  public refreshSubscription!: Subscription;

  constructor(
    private storageService: StorageService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getSessions();
    this.refreshSubscription = this.storageService.refresh.subscribe(() => {
      this.getSessions();
    })
  }

  async getSessions() {
    this.history = await this.storageService.getSessions();
    this.filterHistory();  
    console.log(this.history);  
  }

  filterHistory() { 
    this.history.forEach((session: any) => {    
      for (let exercise of session.exercises) {
        let setsCleaned: any[] = [];
        exercise.sets.forEach((set: any) => {
          if (set.done) {
            setsCleaned.push(set);
          }         
        });  
        exercise.sets = setsCleaned;          
      }           
    }); 
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
    // delete function
  }
}
