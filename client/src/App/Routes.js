import * as AppComponent from './Components';

const AppRoutes = [
  {
    path: '/',
    isExact: true,
    component: AppComponent.Landing,
    layout: AppComponent.Layouts.FixedLayout
  },
  {
    path: '/profile',
    isExact: true,
    component: AppComponent.Profile,
    layout: AppComponent.Layouts.DefaultLayout
  }
]

export default AppRoutes
