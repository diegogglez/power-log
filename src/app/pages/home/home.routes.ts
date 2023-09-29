import { Routes } from "@angular/router";
import { HomePage } from "./home.page";


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'history',
        loadComponent: () => import('../history/history.page').then((m) => m.HistoryPage),
      },
      {
        path: 'history/:id',
        loadComponent: () => import('../history/sessions-history/session-detail/session-detail.page').then((m) => m.SessionDetailPage)
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