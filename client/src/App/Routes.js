import * as AppComponent from './Components';

const AppRoutes = [
  {
    path: '/',
    isExact: true,
    component: AppComponent.Landing,
  },
  {
    path: '/profile',
    isExact: true,
    component: AppComponent.Profile,
  }
]

export default AppRoutes