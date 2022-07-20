import { Routes } from '@angular/router';
import { UserLoaderGuard } from './services/user-loader.guard';
import { HomeComponent } from './home.component';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [UserLoaderGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'security',
        loadChildren: () => import('@eternal/user').then((m) => m.userRoutes),
      },
      {
        path: 'holidays',
        loadChildren: () =>
          import('@eternal/holidays/feature').then((m) => m.holidaysRoutes),
      },
    ],
  },
];
