import React, { Component } from 'react';
import './ratingComHeader.css';
import StarsCom from '../../../components/starsCom';

class RatingComHeader extends Component {

   render() {
     const { scoreObj } = this.props;
     const { overall_score, service_score, food_score, deliver_time, compare_rating } = scoreObj;
    return (
      <header className="ratingComHeader">
        <section className="ratingComHeader-left">
          <p className="rating-score">{this.NumToFixed(overall_score)}</p>
          <p className="score-txt">综合评价</p>
          <p className="score-rate">高于周边商家{this.NumToFixed(compare_rating * 100)}%</p>
        </section>
        <section className="ratingComHeader-right">
          <div><span>服务态度</span><StarsCom rating={service_score}/><span className="ratingComHeader-right-score">{this.NumToFixed(service_score)}</span></div>
          <div><span>菜品评价</span><StarsCom rating={food_score}/><span className="ratingComHeader-right-score">{this.NumToFixed(food_score)}</span></div>
          <div><span>送达时间</span><span className="sending-time">{deliver_time}分钟</span></div>
        </section>
      </header>
    )
   }

   NumToFixed(num) {
    if (num) {
      return num.toFixed(1);
    }else {
      return '';
    }
    
   }
}

export default RatingComHeader;