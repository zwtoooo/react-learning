import React, { Component } from 'react';
import './sellerCom.css';
import CommonFn from '../../../../commonFn';

const SellerActivityList = ({
  activities
}) => {
  return (
    <ul>
      {
        activities.map(activity => {
          return (
            <li key={activity.id} className="sellerCom-activity-li">
              <i style={{'background':'#'+activity.icon_color, 'color':'#fff'}}>{activity.icon_name}</i>
              <span className="activity-tips">{activity.tips}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

const SellerPictures = ({
  albums,
  imgHashChangeUrl
}) => {
  return (
    <ul className="sellerCom-picture-ul">
      {
        albums.map((album, index) => {
          return (
            <li key={`seller-album-${index}`} className="sellerCom-picture-li">
              <img src={'https://fuss10.elemecdn.com/'+imgHashChangeUrl(album.cover_image_hash)+'?imageMogr/format/webp/thumbnail/!200x200r/gravity/Center/crop/200x200/'} alt=""/>
              <p>{`${album.name}(${album.count}张)`}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

class SellerCom extends Component {

  constructor() {
    super();
    this.state = {
      height: window.screen.availHeight - 91
    }
  }

  render() {

    const { imgHashChangeUrl } = this.props;
    const { height } = this.state;
    const { shopdata, distanceChange } = this.props;
    const { activities, albums, description, flavors, phone, address, opening_hours } = shopdata;

    return (
      <div 
        className="sellerCom" 
        style={{
          height: height + "px"
        }}
        onScroll={e => this.listScrollEvent(e)}
        >
        <section className="sellerCom-sendinfo">
          <p className="title">配送信息</p>
          <p>由商家配送提供配送，约{shopdata.order_lead_time}分钟送达，距离{distanceChange(shopdata.distance)}</p>
          <p>配送费￥{shopdata.float_delivery_fee}</p>
        </section>
        <section className="sellerCom-activity">
          <p className="title">活动与服务</p>
          {
            activities ? (
              <SellerActivityList activities={activities} />
            ) : ""
          }
        </section>
        <section className="sellerCom-pictures">
          <p className="title">商家实景</p>
          {
            albums ? (
              <SellerPictures albums={albums} imgHashChangeUrl={imgHashChangeUrl} />
            ) : ""
          }
        </section>
        <section className="sellerCom-selllerinfo">
          <p className="title">商家信息</p>
          <ul>
            <li className="sellerCom-selllerinfo-li">{description}</li>
            <li className="sellerCom-selllerinfo-li"><span>品类</span><span>{
              flavors ? flavors.map(fl => {
                return fl.name
              }) : ''
            }</span></li>
            <li className="sellerCom-selllerinfo-li"><span>商家电话</span><span>{phone}></span></li>
            <li className="sellerCom-selllerinfo-li"><span>地址</span><span>{address}></span></li>
            <li className="sellerCom-selllerinfo-li"><span>营业时间</span><span>{opening_hours}></span></li>
          </ul>
        </section>
      </div>
    )
  }

  listScrollEvent(event) {
    let target = event.target,
        scrollT = target.scrollTop;
        
    document.getElementById("shop-detail-page").scrollTop = scrollT * 4;
  }
}

SellerCom = CommonFn(SellerCom);

export default SellerCom;