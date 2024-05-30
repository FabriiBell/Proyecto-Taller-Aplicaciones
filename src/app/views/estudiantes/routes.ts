import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'estudiante',
        loadComponent: () => import('./estudiante/estudiante.component').then(m => m.EstudianteComponent),
        data: {
          title: 'Estudiante'
        }
      },
      {
        path: 'reportes',
        loadComponent: () => import('./reportes/reportes.component').then(m => m.ReportesComponent),
        data: {
          title: 'Reportes'
        }
      },
    ]
  }
];


