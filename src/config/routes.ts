import RouteItem from '../interfaces/RouteItem';
// import { NotFound404 } from '../pages/NotFound404';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';
import { Search } from '../pages/Search';

const routes: RouteItem[] = [
  {
    key: 'products',
    path: '/products',
    name: 'Products',
    component: Products,
    exact: true,
  },
  {
    key: 'product-details',
    path: '/product/:id',
    name: 'Product Details',
    component: ProductDetails,
    exact: true,
  },
  {
    key: 'search',
    path: '/search',
    name: 'Search',
    component: Search,
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
