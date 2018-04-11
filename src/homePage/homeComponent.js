import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import './homePage.css';
import RestaurantComponent from './components/restaurantComponent';
import FooterComponent from '../footer';
import commonFn from '../commonFn';

const CategoryComponent = ({
  cateArr,
  imgHashChangeUrl
}) => {
  let settings = {
    adaptiveHeight: true,
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="category-container">
    <Slider {...settings}>
      {
        cateArr.map((itemArr, itemArrIdx) => {
          return (
            <div className="category-slider" key={itemArrIdx}>{
              itemArr.map((item, itemIdx) => {
                return (
                  <div className="category-item" key={itemIdx}>
                    <img src={"//fuss10.elemecdn.com/"+imgHashChangeUrl(item.image_hash)+"?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/"} alt={item.name}/>
                    <p>{item.name}</p>
                  </div>
                )
              })
            }
            </div>
          )
        })
      }
    </Slider>
    </div>
  )
}

class HomePageComponent extends React.Component {

  constructor({history, route, sendReqByGet, imgHashChangeUrl}) {
    super();
    this.state = {
      history,
      route,
      searchCls:['search'],
      restaurants: [],
      cateArr: [],
      offset: 0,
      limit: 8,
      isLoading: false,
      noMore: false
    }
    this.sendReqByGet = sendReqByGet;
    this.imgHashChangeUrl = imgHashChangeUrl;
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  componentWillMount() {
    let that = this;
    that.getCategoryData();
    that.getRestaurants();
  }

  render() {
    const { searchCls, cateArr, restaurants } = this.state;
    return (
      <div>
        <div className="page footer-page" onScroll={e => this.scrollEvent(e)}>
          <section className="address"><Link to="/address">福中三路深圳市民中心</Link></section>
          <section className={searchCls.join(" ")}id="home-search">
            <input type="text" placeholder="搜索商家、商品名称" readOnly={true} />
          </section>
          <section className="home-banner">
            <img src="https://fuss10.elemecdn.com/d/aa/ebe05497ef475686970bd31467d8apng.png?imageMogr/format/webp/thumbnail/!750x210r/gravity/Center/crop/750x210/" alt=""/>
          </section>
          <CategoryComponent cateArr={cateArr} imgHashChangeUrl={this.imgHashChangeUrl}/>
          <section className="newuser-activity">
            <img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/" alt=""/>
          </section>
          <section className="activity">
            <div className="left-text">
              <h1>品质套餐</h1>
              <p>搭配齐全吃得好</p>
              <a href="/home">立即抢购&gt;</a>
            </div>
            <div className="right-img">
              <img src="//fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/" alt=""/>
            </div>
          </section>
          <section className="restaurants-section">
            <div className="restaurants-title">推荐商家</div>
            <div className="restaurants-list">
            {
              restaurants.map((item, index) => {
                return (
                  <RestaurantComponent key={index} history={this.state.history} restaurant={item.restaurant} />
                )
              })
            }
            </div>
          </section>
          <FooterComponent {...this.state.route}/>
        </div>
      </div>
    )
  }

  getRestaurants() {
    let that = this,
        restaurants = that.state.restaurants,
        offset = +that.state.offset,
        limit = +that.state.limit;
    const _url = `https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=29.705481&longitude=116.001457&offset=${offset}&limit=${limit}&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=b902e2c749ae47d7983097480ce1b790&terminal=h5`;
    this.sendReqByGet(_url).then(res => {
      let items = res.items.map(r => ({...r, showAllAct: false}));
          restaurants = restaurants.concat(items);
          that.setState({
            'restaurants': restaurants,
            'offset': offset + limit,
            'isLoading': false,
            'noMore': items.length === 0
          });
      }).catch(error => {
        console.error(error);
        that.setState({
        'isLoading': false
      });
    });
  }

  getCategoryData() {
    const _url = 'https://h5.ele.me/restapi/shopping/openapi/entries?latitude=29.705481&longitude=116.001457&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template';
    this.sendReqByGet(_url).then(res => {
      let entires = res[0]['entries'],
          cateArr = [];
          while(entires.length > 0) {
            cateArr.push(entires.splice(0, 10));
          }
      this.setState({'cateArr': cateArr});
    })
  }

  // turnToRestaurantDetail(id) {
  //   this.state.history.push('/shop/' + id);
  // }

  // showAllActAction(id) {
  //   let { restaurants } = this.state;
    
  //   this.setState({
  //     'restaurants': restaurants.map(r => {
  //       if (r.restaurant.id === id) {
  //         return {
  //           ...r,
  //           showAllAct: !r.showAllAct
  //         };
  //       }
  //       return r;
  //     })
  //   })
  // }

  scrollEvent (e) {
    const event = e.nativeEvent;
    let searchCls = this.state.searchCls,
        index = searchCls.indexOf('fixed');
    if (event.target.scrollTop > 38) {
        if (index < 0) {
          searchCls.push('fixed');
          this.setState({
            searchCls: searchCls
          });
        }
    }else {
      if (index > 0) {
        searchCls.splice(index, 1);
        this.setState({
          searchCls: searchCls
        });
      }
    }

    if (this.state.isLoading || this.state.noMre) {
      return;
    }
    if (event.target.scrollHeight - event.target.offsetHeight - event.target.scrollTop < 100) {
      this.getRestaurants();
      this.setState({'isLoading': true});
    }
  }

}

HomePageComponent = commonFn(HomePageComponent);

export default HomePageComponent;
