import App from './App';
import HomeComponent from './homePage/homeComponent';
import DiscoverComponent from './discoverPage/discoverComponent';
import OrderComponent from './orderPage/orderComponent';
import MineComponent from './minePage/mineComponent';
import AddressComponent from './homePage/subPage/addressComponent';
import RestaurantDetailComponent from './homePage/subPage/restaurantDetail/restaurantDetailComponent';
import NewPlaceComponent from './discoverPage/subPage/newplaceComponent';

const ROUTES = [
  {
    component: App,
    routes:[
      {
        path: '/',
        title: '首页',
        component: HomeComponent,
        exact: true,
        icon: 'icon-ele'
      },
      {
        path: '/discover',
        title: '发现',
        component: DiscoverComponent,
        icon: 'icon-discover',
        routes: [
          {
            path: '/discover/new',
            component: NewPlaceComponent
          }
        ]
      },
      {
        path: '/order',
        title: '订单',
        component: OrderComponent,
        icon: 'icon-order'
      },
      {
        path: '/mine',
        title: '我的',
        component: MineComponent,
        icon: 'icon-mine'
      },
      {
        path: '/address',
        component: AddressComponent
      },
      {
        path: '/shop/:id',
        component: RestaurantDetailComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]
  }
];

export default ROUTES;

