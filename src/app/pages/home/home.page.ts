import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { WorkoutService } from 'src/app/services/workout/workout.service';
import { SessionModalComponent } from './session-modal/session-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SessionModalComponent
  ],
})
export class HomePage implements OnInit {

  public environmentInjector = inject(EnvironmentInjector);
  public isWorkingoutSuscription!: Subscription;

  constructor(
    private workoutService: WorkoutService,
    private modalController: ModalController
    ) {}

  ngOnInit() {
    this.isWorkingoutSuscription = this.workoutService.isWorkingout.subscribe((data: any) => {
      this.openSessionModal();
    })
  }

  async openSessionModal() {
    const modal = await this.modalController.create({
      component: SessionModalComponent,
      backdropBreakpoint: 1,
      breakpoints: [0.1, 0.5, 0.9, 1],
      initialBreakpoint: 1,
      cssClass: 'sessionModal',
      backdropDismiss: false
    });
    await modal.present();
  }

}
