import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSession(this.id);
  }

  async getSession(id: string) {
    this.session = await this.storageService.getSessionById(id);
  }
}
