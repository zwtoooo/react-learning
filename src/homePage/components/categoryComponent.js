import React from 'react';
import Slider from 'react-slick';
import CommonFn from '../../commonFn';

class CategoryComponent extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      cateArr: []
    }
    this.sendReqByGet = props.sendReqByGet;
    this.imgHashChangeUrl = props.imgHashChangeUrl;
  }

  componentWillMount() {
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

  render() {
    let that = this;
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
          that.state.cateArr.map((itemArr, itemArrIdx) => {
            return (
              <div className="category-slider" key={itemArrIdx}>{
                itemArr.map((item, itemIdx) => {
                  return (
                    <div className="category-item" key={itemIdx}>
                      <img src={"//fuss10.elemecdn.com/"+this.imgHashChangeUrl(item.image_hash)+"?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/"} alt={item.name}/>
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

  componentDidMount() {
    // let categorySwiper = new Swiper(".category-container");
  }

}

CategoryComponent = CommonFn(CategoryComponent);

export default CategoryComponent;