import RouteItem from '../interfaces/RouteItem';
// import { NotFound404 } from '../pages/NotFound404';
import { Home } from '../pages/Home';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';
import { Search } from '../pages/Search';
import { NotFound404 } from '../pages/NotFound404';
import { Cart } from '../pages/Cart';

const routes: RouteItem[] = [
  {
    key: 'cart',
    path: '/cart',
    name: 'Cart',
    component: Cart,
    exact: true,
  },
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
  {
    key: 'not-found',
    path: '*',
    name: 'NotFound404',
    component: NotFound404,
    exact: true,
  },
];

export default routes;
