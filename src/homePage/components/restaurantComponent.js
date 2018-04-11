import React from 'react';
import commonFn from '../../commonFn';
import StarsCom from './starsCom';

class RestaurantComponent extends React.Component {

  constructor({history, imgHashChangeUrl}) {
    super();
    this.state = {
      history: history,
      showAllAct: false
    }
    this.turnToRestaurantDetail = this.turnToRestaurantDetail.bind(this);
    this.imgHashChangeUrl = imgHashChangeUrl;
  }

  render() {
    let that = this,
        restaurant = that.props.restaurant,
        activitiesCount = restaurant.activities.length;
    return (
      <div className="restaurant" onClick={that.turnToRestaurantDetail}>
        <section className="left-side"><img src={'//fuss10.elemecdn.com/'+ this.imgHashChangeUrl(restaurant.image_path) +'??imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'} alt="" /></section>
        <section className="right-side">
          <h2>{restaurant.name}</h2>
          <div className="sec-line"><StarsCom rating={restaurant.rating}/><div className="grade">{restaurant.rating}</div><div className="month-order-count">月售{restaurant.recent_order_num}单</div></div>
          <div className="third-line"><section className="left"><div className="send-least-cash">￥{restaurant.float_delivery_fee}起送</div><div className="other-need-cash">{restaurant.piecewise_agent_fee.description}</div></section><section className="right"><div className="distance">{this.distanceChange(restaurant.distance)}</div><div className="need-time">{restaurant.order_lead_time + '分钟'}</div></section></div>
          <div className="activities-list">{
            activitiesCount > 2 ? <div className="more-activities" onClick={(e)=>that.showAllActivities(this, e)}>{activitiesCount}个活动</div> : ''
          }
          {
            restaurant.activities.map((item, index) => {
              if (index > 1 && !that.state.showAllAct) {
                return '';
              }
              return (
                <div className="restaurant-activity" key={index}><i style={{backgroundColor: '#'+item.icon_color}}>{item.icon_name}</i>{item.description}</div>
              )
            })
          }
          </div>
        </section>
      </div>
    )
  }

  showAllActivities(_this, e) {
    e.stopPropagation();
    let flag = this.state.showAllAct;
    _this.setState({'showAllAct': !flag});
  }

  turnToRestaurantDetail() {
    this.state.history.push('/shop/' + this.props.restaurant.id);
  }

  distanceChange(distance) {
    if (distance > 1000) {
      return (distance/1000).toFixed(2) + 'km';
    }else {
      return distance + 'm';
    }
  }

}

RestaurantComponent = commonFn(RestaurantComponent);

export default RestaurantComponent;