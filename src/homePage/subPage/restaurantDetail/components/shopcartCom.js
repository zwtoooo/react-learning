import React, { Component } from 'react';
import './shopcartCom.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { 
  addFoodToCart,
  reduceFoodFromCart,
  removeAllFoodsFromCart
 } from '../../../../eleRedux/shopCartAction';
 import { Map } from 'immutable';

const ShopCartComFoodsList = ({ 
  shopCart, 
  pid, 
  addCount, 
  reduceCount 
}) => {
  let foodsList = [];
  if (shopCart) {
    shopCart.forEach((foods, id) => {
      foods.forEach(f => {
        f = f.merge(Map({pid, id})).toObject();
        foodsList.push(f)
      })
    })
  }
  return (
    <ul className="shopCartCom-foods-ul">
    {
      foodsList.map((food,fidx) => {
        return (
          <li key={`food-${fidx}`} className="shopCartCom-food-li">
            <div className="shopCartCom-food-li-name">
              {food.name}
            </div><div className="shopCartCom-food-li-prices">
              {
                food.original_price === 
                food.price ? "" : (<span className="original-price">￥{(food.original_price * food.count).toFixed(2)}</span>)
              }
              <span className="price">￥{(food.price * food.count).toFixed(2)}</span>
            </div><div className="shopCartCom-food-li-operate">
              <span
                className="decrease-count" 
                onClick={() => reduceCount(food)}
              >-</span>
              <em>{food.count}</em>
              <span 
                className="increase-count"
                onClick={() => addCount(food)}
              >+</span>
            </div>
          </li>
        )
      })
    }
    </ul>
  )
}

class shopCartCom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showList: false
    };
    this.showFoodsList = this.showFoodsList.bind(this);
  }

  render() {

    const { float_delivery_fee, float_minimum_order_amount, shopCart, id, addCount, reduceCount, removeAll } = this.props;
    const { total_price, total_original_price, total_count, has_count } = this.getAllPricesAndCount();
    const { showList } = this.state;

    return (
      <div className="shopCartCom">
        <section className="shopCartCom-summary">
          <div className="shopCartCom-summary-left" onClick={this.showFoodsList}>
            <span 
              className={
                classnames({
                  "shopCartCom-summary-icon-span": true,
                  "can-click": !!total_count
                })
              }
            ><i className="iconfont icon-shopcart"></i>{total_count > 0 ? (<em className="shopCartCom-foods-count">{total_count}</em>) : ""}</span>
          </div><div className="shopCartCom-summary-center">
            <p className="shopCartCom-prices"><span className="shopCartCom-total-price">￥{total_price}</span>{has_count ? "" : (<span className="shopCartCom-total-original-price">￥{total_original_price}</span>)}</p>
            <p className="shopCartCom-sending-price">配送费￥{float_delivery_fee}</p>
          </div><div className="shopCartCom-summary-right">
          {
            total_count === 0 ? (
              <span>￥{float_minimum_order_amount}起送</span>
            ) : (
              <span className="shopCartCom-goto-buy">去结算</span>
            )
          }
          </div>
        </section>
        <section 
          className={
            classnames({
            "shopCartCom-foods-list-wrap": true,
            "show": showList && !!total_count
            })
          }
          onClick={this.showFoodsList}
        >
          <div className="shopCartCom-foods-list" onClick={e =>  e.stopPropagation()}>
            <p className="shopCartCom-foods-list-title">
              <span className="shopCartCom-foods-list-title-left">己选商品</span>
              <span 
                className="shopCartCom-foods-list-title-right"
                onClick={() => {
                  removeAll(id);
                }}
              >清空</span>
            </p>
            <ShopCartComFoodsList shopCart={shopCart} pid={id} addCount={addCount} reduceCount={reduceCount} />
          </div>
        </section>
      </div>
    )
  }

  getAllPricesAndCount() {
    const { shopCart } = this.props;
    let totalPrice = 0, 
        totalOriginalPrice = 0,
        totalCount = 0;
    if (shopCart) {
      shopCart.forEach(foods => {
        foods.forEach(f => {
          f = f.toObject();
          totalPrice += f.price * f.count;
          totalOriginalPrice += f.original_price * f.count;
          totalCount += f.count;
        })
      });
    }
    return {
      total_price: Math.round(totalPrice * 100) / 100,
      total_original_price: Math.round(totalOriginalPrice * 100) /100,
      total_count: totalCount,
      has_count: totalPrice === totalOriginalPrice
    }
  }

  showFoodsList() {
    let { showList } = this.state;
    this.setState({
      'showList': !showList
    });
  }

}

const mapStateToShopCartProps = (state, ownProps) => {
  return {
    shopCart: state.shopsMap.get(ownProps.id)
  }
}
const mapDispatchToShopCartProps = (dispatch, ownProps) => {
  return {
    addCount: (food) => {
      dispatch(
        addFoodToCart({
          ...food,
          count: 1
        })
      )
    },
    reduceCount: (food) => {
      dispatch(
        reduceFoodFromCart({
          ...food,
          count: 1
        })
      )
    },
    removeAll: (pid) => {
      dispatch(removeAllFoodsFromCart(pid));
    }
  }
}

export default connect(
  mapStateToShopCartProps,
  mapDispatchToShopCartProps
)(shopCartCom);