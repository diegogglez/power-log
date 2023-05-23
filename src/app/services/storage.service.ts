import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subject } from 'rxjs'
import { RMItem } from '../models/rms';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private refresh$ = new Subject<void>();

  constructor() { }

  get refresh() {
    return this.refresh$;
  }

  async getRMs() {
    const rmHistory = await Preferences.get({key: 'RMs'})
    
    if(!rmHistory.value) {
      const defaultRMCollection: RMItem[] = [];
      await Preferences.set({key: 'RMs', value: JSON.stringify(defaultRMCollection)})
    }
    
    return JSON.parse(rmHistory.value || '[]');
  }

  async addRM(rm: RMItem) {
    const rmHistory = await this.getRMs();
    rmHistory.unshift(rm); 
    console.log(rmHistory);
    await Preferences.set({key: 'RMs', value: JSON.stringify(rmHistory)})
    .then(() => this.refresh$.next());
  }

  async deleteRM(rm: RMItem) {
    const rmHistory = await this.getRMs(); 
    const index = rmHistory.findIndex((item: RMItem) => item.id === rm.id)
    console.log(index);
    rmHistory.splice(index, 1);
    await Preferences.set({key: 'RMs', value: JSON.stringify(rmHistory)})
    .then(() => this.refresh$.next());
  }
}
