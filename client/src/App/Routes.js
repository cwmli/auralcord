import * as AppComponent from './Components';

const AppRoutes = [
  {
    path: '/',
    isExact: true,
    component: AppComponent.Landing,
    layout: AppComponent.Layouts.FixedLayout
  },
  {
    path: '/dashboard',
    isExact: true,
    component: AppComponent.Dashboard,
    layout: AppComponent.Layouts.DefaultLayout
  },
  {
    path: '/playlist/:id',
    isExact: true,
    component: AppComponent.Playlist,
    layout: AppComponent.Layouts.DefaultLayout
  }
]

export default AppRoutes
