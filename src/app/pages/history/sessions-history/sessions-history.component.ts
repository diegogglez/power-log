import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sessions-history',
  templateUrl: './sessions-history.component.html',
  styleUrls: ['./sessions-history.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
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
    console.log(this.history);    
  }

  formatSessions() {
    //* We need to filter de data comming from the form, 
    //* ignoring all the null exercises sets
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
    // await this.storageService.deleteRM(item);
  }
}
