import React, { Component } from 'react';
import './menuCom.css';
import commonFn from '../../../../commonFn';
import classnames from 'classnames';
import SpecSelectModalCom from './specSelectModalCom';
import { connect } from 'react-redux';
import { addFoodToCart } from '../../../../eleRedux/shopCartAction';
import Alert from 'react-s-alert';

class MenuCom extends Component {

  constructor({ id, sendReqByGet, imgHashChangeUrl }) {
    super();
    this.state = {
      id: id,
      menuData: [],
      activeIdx: 0,
      height: window.screen.availHeight - 91,
      foodsEleScrollTopArr: [],
      isTap: false,
      showSpec: false,
      specFood: {}

    }
    this.sendReqByGet = sendReqByGet;
    this.imgHashChangeUrl = imgHashChangeUrl;
    this.menuIndexTap = this.menuIndexTap.bind(this);
    this.listScrollEvent = this.listScrollEvent.bind(this);
  }

  componentWillMount() {
    this.getMenuList();
  }

  render() {
    const { menuData, activeIdx, height, showSpec, specFood } = this.state;
    const { dispatch, id } = this.props;
    return (
      <div className="menuCom" style={{height: height + "px"}}>
        <aside className="menu-index">{
          menuData.map((item, index) => {
            return (
              <div className={classnames({"menu-index-item": true, "active": index === activeIdx})} key={item.id} onClick={e => this.menuIndexTap(index)}>{item.icon_url ? (<img src={"https://fuss10.elemecdn.com/"+this.imgHashChangeUrl(item.icon_url)+"?imageMogr/format/webp/thumbnail/26x/"} alt=""/>) : ""}<span>{item.name}</span></div>
            )
          })
        }</aside>
        <section className="menu-list" id="menu-list" onScroll={e => this.listScrollEvent(e)}>{
          menuData.map((item, tidx) => {
            return (
              <div className="foods" key={'foods-'+tidx}>
                <p><span className="name">{item.name}</span><span className="description">{item.description}</span></p>
                <ul className="foods-ul">{
                  item.foods.map((food, fidx) => {
                    let specfoods = food.specfoods,
                        specfoods_1 = specfoods[0],
                        is_multiple = specfoods.length > 1,
                        activity = food.activity;

                    return (
                      <li className="food-li" key={'food-li-'+fidx}>
                        <div className="food-li-img"><img src={'https://fuss10.elemecdn.com/'+ this.imgHashChangeUrl(food.image_path) +'?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/'} alt=""/></div>
                        <div className="food-li-txt">
                          <p className="food-li-name">{food.name}</p>
                          <p className="food-li-des">{food.description}</p>
                          <p className="food-li-sell"><span>月售{food.month_sales}份</span><span>好评率{food.satisfy_rate}%</span></p>
                          <div className="food-li-bottom">
                            <div className="food-li-bottom-left">
                              {
                                activity ? (
                                  <p className="food-li-activity"><span className="activity-count">{this.countCal(specfoods_1.price, specfoods_1.original_price)}</span>{activity.applicable_quantity_text ? (<span className="actitvity-quantity-text">{activity.applicable_quantity_text}</span>) : ""}</p>
                                ) : ""
                              }
                              <p className="food-li-price">￥<span className="now-price">{specfoods_1.price}</span><em>{is_multiple ? "起" : ""}</em><span className="origin-price">{activity ? ("￥"+specfoods_1.original_price) : ""}</span></p>
                            </div>
                            <div className="food-li-bottom-right">
                              {
                                is_multiple ? (
                                  <div className="select-size-btn" onClick={this.showSpecModal.bind(this, food)}>选规格</div>
                                ) : (
                                  <div className="select-btn" onClick={() => {
                                    dispatch(addFoodToCart({
                                      name: food.name,
                                      price: specfoods_1.price,
                                      original_price: specfoods_1.original_price || specfoods_1.price,
                                      count: 1,
                                      id: specfoods_1.item_id,
                                      pid: id,
                                      addtional: '',
                                      image_hash: food.image_path
                                    }));
                                    Alert.success('添加成功',{
                                      timeout: 1500
                                    });
                                  }}>+</div>
                                )
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }</ul>
              </div>
            )
          })
        }</section>
        <SpecSelectModalCom 
          showSpec={showSpec} 
          closeSpecModal={this.showSpecModal.bind(this)}
          specFood ={specFood}/>
      </div>
    )
  }

  getMenuList() {
    const { id } = this.props;
    const url = `https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=${id}`;
    this.sendReqByGet(url).then(data => {
      if (!data.length) {
        let random = Math.floor( Math.random() * 6 ) + 1;
        this.sendReqByGet(`../../../menu/menu${random}.json`).then(res => {
          console.log(res);
          this.setState({'menuData': res});
        })
      }else {
        this.setState({'menuData': data});
      }
    });
  }

  menuIndexTap(index) {
    let { foodsEleScrollTopArr } = this.state;
    this.setState({'activeIdx': index, 'isTap': true});
    if (!foodsEleScrollTopArr.length) {
      this.getFoodsEleScrollTopArr(arr => {
        document.getElementById("menu-list").scrollTop = arr[index];
      });
    }else {
      document.getElementById("menu-list").scrollTop = foodsEleScrollTopArr[index];
    }
  }

  countCal(fixed_pri, original_pri) {
    if (fixed_pri && original_pri) {
      return (fixed_pri / original_pri * 10).toFixed(1) + "折";
    }else {
      return '';
    }
  }

  listScrollEvent(e) {
    let target = e.target,
        scrollT = target.scrollTop,
        { activeIdx, foodsEleScrollTopArr, isTap } = this.state;
    
    if(isTap) {
      let flag = foodsEleScrollTopArr.some((item, index) => {
        if (Math.abs(scrollT - item) < 10) {
          return true;
        }
        return false;
      });
      if (flag) {
        this.setState({'isTap': false});
      }
      return;
    }
    
    if (!foodsEleScrollTopArr.length) {
      this.getFoodsEleScrollTopArr();
    }else {
      foodsEleScrollTopArr.some((item, index) => {
        if (scrollT < item) {
          if (activeIdx !== index - 1) {
            this.setState({'activeIdx': index - 1});
          }
          return true;
        }
        return false;
      })
    }
    document.getElementById("shop-detail-page").scrollTop = scrollT * 2;
  }

  getFoodsEleScrollTopArr(callback) {
    let { foodsEleScrollTopArr } = this.state,
        foodsEleList = document.querySelectorAll('.foods');
    foodsEleScrollTopArr = Array.prototype.map.call(foodsEleList, ele => ele.offsetTop);
    this.setState({"foodsEleScrollTopArr": foodsEleScrollTopArr});
    if (typeof callback === 'function') {
      callback(foodsEleScrollTopArr);
    }
  }

  showSpecModal(food) {
    
    let { showSpec } = this.state;
    if (food) {
      this.setState({'showSpec': !showSpec, 'specFood': food});
    }else {
      this.setState({'showSpec': !showSpec});
    }
    
  }
}

MenuCom = commonFn(MenuCom);

export default connect()(MenuCom);