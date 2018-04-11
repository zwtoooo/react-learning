import React, { Component } from 'react';
import './ratingComItem.css';
import StarsCom from '../../../components/starsCom';
import CommonFn from '../../../../commonFn';

function ShootsOfFoods(imgObjArr, imgHashChangeUrl) {

  if (!imgObjArr || !imgObjArr.length) {
    return '';
  }

  return (
    <ul className="shoots-list">
    {
      imgObjArr.map((imgObj, imgObjIdx) => {
        return (
          <li key={`imgObj-${imgObjIdx}`}><img src={"https://fuss10.elemecdn.com/"+imgHashChangeUrl(imgObj.image_hash)+"?imageMogr/format/webp/thumbnail/!142x142r/gravity/Center/crop/142x142/"} alt=""/></li>
        )
      })
    }
    </ul>
  )
}

function RatingTxtOfFoods(ratingTxt) {

  if (!ratingTxt) {
    return '';
  }

  return (
    <p className="rating-text">{ratingTxt}</p>
  )
}

function NamesOfFoods(namesArr) {

  if (!namesArr || !namesArr.length) {
    return '';
  }

  return (
    <div className="name-list">
    {
      namesArr.map((name, nameIdx) => {
        return (
          <span key={`food-name-${nameIdx}`} className="food-name">{name.rate_name}</span>
        )
      })
    }
    </div>
  )
}

class RatingComItem extends Component {

  constructor({imgHashChangeUrl}) {
    super();

    this.state = {

    };
    this.imgHashChangeUrl = imgHashChangeUrl;

  }

  render() {

    const { data } = this.props;

    return (
      <div className="ratingComItem">
        <section className="ratingComItem-logo">
          <img src={"https://fuss10.elemecdn.com/"+this.imgHashChangeUrl(data.avatar || 'cf5d0b0f2fc83f3ac3e4a0cfae891256png')+"?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/"} alt="" />
        </section>
        <section className="ratingComItem-detail">
          <div className="ratingComItem-detail-user"><span className="ratingComItem-author">{data.username}</span><time className="ratingComItem-date">{data.rated_at}</time></div>
          <div className="ratingComItem-detail-shop"><StarsCom rating={data.rating}/><span className="ratingComItem-sending">{data.time_spent_desc}</span></div>
          {ShootsOfFoods(data.order_images, this.imgHashChangeUrl)}
          {RatingTxtOfFoods(data.rating_text)}
          {NamesOfFoods(data.food_ratings)}
        </section>
      </div>
    )
  }
}

RatingComItem = CommonFn(RatingComItem);

export default RatingComItem;