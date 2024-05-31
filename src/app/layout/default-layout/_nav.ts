import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Club Universitario',
  },
  //-------------------------------Inicio
  {
    title: true,
    name: 'Estudiantes Club'
  },
  {
    name: 'Estudiantes',
    url: '/estudiantes',
    iconComponent: { name: 'cil-puzzle' },
  children: [
    {
      name: 'Estudiantes',
      url: '/estudiantes/estudiante',
      icon: 'nav-icon-bullet'
    },
      {
        name: 'Reportes',
        url: '/estudiantes/reportes',
        icon: 'nav-icon-bullet'
      },
  ]
},
  //--------------------------------Final
  {
    title: true,
    name: 'Profesores Club'
  },
  {
    name: 'Profesores',
    url: '/estudiantes',
    iconComponent: { name: 'cil-puzzle' },
  children: [
    {
      name: 'Reportes',
      url: '/estudiantes/estudiante',
      icon: 'nav-icon-bullet'
    },
      {
        name: 'Reportes',
        url: '/estudiantes/reportes',
        icon: 'nav-icon-bullet'
      },
  ]
},
]