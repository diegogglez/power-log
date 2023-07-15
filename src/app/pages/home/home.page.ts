import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { WorkoutService } from 'src/app/services/workout/workout.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage implements OnInit {

  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private workoutService: WorkoutService,
    private modalController: ModalController
    ) {}

  ngOnInit() {}
}
