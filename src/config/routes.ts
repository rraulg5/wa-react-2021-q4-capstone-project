import RouteItem from '../interfaces/RouteItem';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';

const routes: RouteItem[] = [
  {
    key: 'products',
    path: '/products',
    name: 'Products',
    component: Products,
    exact: true,
  },
  {
    key: 'slash-home',
    path: '/home',
    name: 'Home',
    component: Home,
    exact: true,
  },
  {
    key: 'home',
    path: '/',
    name: 'Home',
    component: Home,
    exact: true,
  },
];

export default routes;
