import React from 'react';
import commonFn from '../../../commonFn';
import './restaurantDetail.css';
import classnames from 'classnames';
import MenuCom from './components/menuCom';
import RatingCom from './components/ratingCom';
import SellerCom from './components/sellerCom';
import ShopCartCom from './components/shopcartCom';

class RestaurantDetailComponent extends React.Component {

  constructor({history, match, sendReqByGet, imgHashChangeUrl}) {
    super();
    this.state = {
      history: history,
      id: match.params.id,
      shopData: {},
      activeTab: 'order'
    }
    this.sendReqByGet = sendReqByGet;
    this.imgHashChangeUrl = imgHashChangeUrl;
    this.returnBack = this.returnBack.bind(this);
    this.tabClick = this.tabClick.bind(this);
  }

  componentWillMount() {
    let that = this;
    that.getShopData();
  }

  render() {
    const { id, shopData, activeTab } = this.state;
    const imgHash = shopData.image_path;
    const navStyle = {
      backgroundImage: 'url(https://fuss10.elemecdn.com/'+ this.imgHashChangeUrl(imgHash) +'?imageMogr/format/webp/thumbnail/!40p/blur/50x40/)'
    };
    
    return (
      <div className="page" id="shop-detail-page">
        <nav className="top-area" style={navStyle}><span className="back" onClick={this.returnBack}></span></nav>
        <section className="shop-info">
          <div className="shop-logo"><img src={'https://fuss10.elemecdn.com/'+ this.imgHashChangeUrl(shopData.image_path) +'?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'} alt=""/></div>
          <div className="shop-detail">
            <p className="shop-name"><i className="brand">品牌</i><span>{shopData.name}</span></p>
            <p className="other-info"><span>{shopData.rating}</span><span>月售{shopData.recent_order_num}单</span><span>商家配送 约{shopData.order_lead_time}分钟</span><span>距离{this.distanceChange(shopData.distance)}</span></p>
            <p className="shop-motion">欢迎光临，用餐高峰期请提前下单，谢谢。</p>
          </div>
          {
            shopData['activities'] ? (
              <div className="shop-activities">
                <p className="activity"><i className="activity-icon" style={{'backgroundColor':'#'+shopData['activities'][0]['icon_color']}}>{shopData['activities'][0]['icon_name']}</i><span>{shopData['activities'] ? shopData['activities'][0]['tips'] : ''}</span></p>
                <p className="more-activities">{shopData['activities']['length']}个优惠<i className="iconfont icon-arrow-down"></i></p>
              </div>
            ) : ''
          }
        </section>
        <section className="menu-area">
          <div>
            <ul className="tabs-nav">
              <li className={classnames({"nav-item": true, "active": activeTab === "order"})} data-tab="order" onClick={e => this.tabClick(e)}><span>点餐</span></li>
              <li className={classnames({"nav-item": true, "active": activeTab === "rating"})} data-tab="rating" onClick={e => this.tabClick(e)}><span>评价</span></li>
              <li className={classnames({"nav-item": true, "active": activeTab === "seller"})} data-tab="seller" onClick={e => this.tabClick(e)}><span>商家</span></li>
            </ul>
          </div>
          <div>
            <ul className="tabs-content">
              <li className={classnames({"content-item": true, "active": activeTab === "order"})}><MenuCom id={id}/></li>
              <li className={classnames({"content-item": true, "active": activeTab === "rating"})}><RatingCom id={id}/></li>
              <li className={classnames({"content-item": true, "active": activeTab === "seller"})}><SellerCom shopdata={shopData} distanceChange={this.distanceChange} /></li>
            </ul>
          </div>
        </section>
        <ShopCartCom id={id} float_delivery_fee={shopData.float_delivery_fee} float_minimum_order_amount={shopData.float_minimum_order_amount} />
      </div>
    )
  }

  getShopData() {
    const { id } = this.state;
    const url = `https://h5.ele.me/restapi/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=22.54286&longitude=114.059563`;
    this.sendReqByGet(url).then(data => {
      this.setState({shopData: data});
    });
  }

  returnBack() {
    this.state.history.goBack();
  }

  distanceChange(distance) {
    if (distance > 1000) {
      return (distance/1000).toFixed(2) + 'km';
    }else {
      return distance + 'm';
    }
  }

  tabClick(e) {
    let currentTarget = e.currentTarget,
        dataTab = currentTarget.getAttribute('data-tab');
    this.setState({activeTab: dataTab});
  }

}

RestaurantDetailComponent = commonFn(RestaurantDetailComponent);

export default RestaurantDetailComponent;
