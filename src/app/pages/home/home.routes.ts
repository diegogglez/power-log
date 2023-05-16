import { Routes } from "@angular/router";
import { HomePage } from "./home.page";


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/profile',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then((m) => m.ProfilePage)
      },
      {
        path: 'history',
        loadComponent: () => import('../history/history.page').then((m) => m.HistoryPage)
      },
      {
        path: 'workouts',
        loadComponent: () => import('../workouts/workouts.page').then((m) => m.WorkoutsPage)
      },
      {
        path: 'rm-calculator',
        loadComponent: () => import('../rm-calculator/rm-calculator.page').then((m) => m.RmCalculatorPage)
      },
    ]
  }
]