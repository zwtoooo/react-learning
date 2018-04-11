import React, { Component } from 'react';

class StarsCom extends Component {

    render() {

        const { rating } = this.props;

        return (
            <div className="score"><ul className="empty-stars"><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li></ul><ul className="full-stars" style={{width: rating*20+"%"}}><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li><li className="iconfont icon-star"></li></ul></div>
        )
    }
}

export default StarsCom;