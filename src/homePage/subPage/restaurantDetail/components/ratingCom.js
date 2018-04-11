import React, { Component } from 'react';
import './ratingCom.css';
import commonFn from '../../../../commonFn';
import RatingComHeader from './ratingComHeader';
import RatingComItem from './ratingComItem';
import classnames from 'classnames';

class RatingCom extends Component {

  constructor({id, sendReqByGet}) {
    super();
    this.state = {
      id: id,
      param: {
        offset: 0,
        limit: 8,
        isLoading: false,
        isMore: true,
        tagName: ''
      },
      scoreData: {},
      tagsData: [],
      ratingData: [],
      height: window.screen.availHeight - 91
    }
    this.sendReqByGet = sendReqByGet;
    this.changeTagName = this.changeTagName.bind(this);
  }

  componentWillMount() {
    this.getRatingData();
    this.getScoresData();
    this.getTagsData();
  }

  render() {
    const { scoreData, tagsData, ratingData, param, height } = this.state;
    return (
      <div className="ratingCom" style={{height: height + "px"}} onScroll={e => this.listScrollEvent(e)}>
        <RatingComHeader scoreObj={scoreData} />
        <div className="ratingCom-center">
        {
          tagsData.map((tag, tagIdx) => {
            let { tagName } = param;
            tagName = tagName ? decodeURIComponent(tagName) : '全部';
            return (
              <span className={classnames({
                'good': !tag.unsatisfied,
                'bad': tag.unsatisfied,
                'active': tag.name === tagName
              })} key={`tag-${tagIdx}`} onClick={e => this.changeTagName(tag.name)}>{`${tag.name}(${tag.count})`}</span>
            )
          })
        }
        </div>
        <div className="rating-list">
        {
          ratingData.map((rating, ratingIdx) => {
            return <RatingComItem key={`rating-${ratingIdx}`} data={rating} />;
          })
        }
        </div>
        {param.isMore ? '' : (<p className="nomore-tip">没有更多评论！！</p>)}
      </div>
    )
  }

  getRatingData(refresh) {
    let { id, param, ratingData } = this.state;
    let { offset, limit, tagName } = param;
    let url = `https://h5.ele.me/restapi/ugc/v3/restaurants/${id}/ratings?has_content=true&offset=${offset}&limit=${limit}`;
    if (tagName) {
      url += '&tag_name=' + tagName;
    }
    if (param.isLoading || !param.isMore) {
      return;
    }
    this.sendReqByGet(url).then(data=> {
      param.isLoading = false;
      if (!data.length) {
        param.isMore = false;
        this.setState({'param': param});
        return;
      }
      ratingData = refresh ? data : ratingData.concat(data);
      param.offset = offset + limit;
      param.isMore = data.length === 8;
      this.setState({
        'ratingData': ratingData,
        'param': param
      });
    }).catch(error => {
      param.isLoading = false;
    this.setState({'param': param});
    });
    param.isLoading = true;
    this.setState({'param': param});
  }

  getScoresData() {
    const { id } = this.state;
    const url = `https://h5.ele.me/restapi/ugc/v2/restaurants/${id}/ratings/scores`;
    this.sendReqByGet(url).then(data => {
      this.setState({
        'scoreData': data
      });
    })
  }

  getTagsData() {
    const { id } = this.state;
    const url = `https://h5.ele.me/restapi/ugc/v2/restaurants/${id}/ratings/tags`;
    this.sendReqByGet(url).then(data => {
      this.setState({
        'tagsData': data
      });
    })
  }

  changeTagName(name) {
    if (!name) {
      return;
    }
    let { param } = this.state;
    param.tagName = encodeURIComponent(name);
    param.offset = 0;
    param.isLoading = false;
    param.isMore = true;
    this.setState({
      'param': param
    });
    this.getRatingData(true);
  }

  listScrollEvent(event) {
    let target = event.target,
        scrollT = target.scrollTop;
        
    document.getElementById("shop-detail-page").scrollTop = scrollT * 2;

    let { param } = this.state;
    if (param.isLoading || !param.isMore) {
      return;
    }
    if (target.scrollHeight - target.offsetHeight - target.scrollTop < 100) {
      this.getRatingData();
    }
  }

}

RatingCom = commonFn(RatingCom);

export default RatingCom;