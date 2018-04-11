import HomePageComponent from './homePage/homeComponent';
import DiscoverPageComponent from './discoverPage/discoverComponent';
import OrderPageComponent from './orderPage/orderComponent';
import MinePageComponent from './minePage/mineComponent';

import AddressComponent from './homePage/subPage/addressComponent';
import RestaurantDetailComponent from './homePage/subPage/restaurantDetailComponent';

const routes = [
  {
    path: '/home',
    title: '首页',
    component: HomePageComponent,
    icon: 'icon-ele',
    routes: [
      {
        path: '/home/address',
        title: '地址',
        component: AddressComponent
      },
      {
        path: '/home/detail/:id',
        title: '地址',
        component: RestaurantDetailComponent
      },
    ]
  },
  {
    path: '/discover',
    title: '发现',
    component: DiscoverPageComponent,
    icon: 'icon-discover'
  },
  {
    path: '/order',
    title: '订单',
    component: OrderPageComponent,
    icon: 'icon-order'
  },
  {
    path: '/mine',
    title: '我的',
    component: MinePageComponent,
    icon: 'icon-mine'
  }
];

export default routes;
