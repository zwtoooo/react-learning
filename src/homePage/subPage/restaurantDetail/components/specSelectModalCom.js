import React, { Component } from 'react';
import './specSelectModalCom.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addFoodToCart } from '../../../../eleRedux/shopCartAction';
import Alert from 'react-s-alert';

class SpecSelectModalCom extends Component {

  constructor() {
    super();
    this.state = {
      specIdx: 0,
      attrsArr: []
    };
    this.setSpec = this.setSpec.bind(this);
    this.setAttr = this.setAttr.bind(this);
  }

  render() {
    let { showSpec, specFood, dispatch, closeSpecModal } = this.props;
    let { specifications, attrs, specfoods, activity } = specFood;
    let { specIdx, attrsArr } = this.state;
    
    if (!specifications) {
      return "";
    }

    return (
      <div className={classnames({"modal-wrap": true, 'show': showSpec})}>
        <div className="modal-window">
          <div className="header">{specFood.name}<span className="close-modal" onClick={closeSpecModal}></span></div>
          <div className="main">
            <section>
              <p>{specifications[0].name}</p>
              <ul>
                {
                  specifications[0].values.map((val, idx)  => {
                    return (
                      <li key={`specvalue-${idx}`} className={classnames({"selected": idx === specIdx})} onClick={e => this.setSpec(idx)}>{val}</li>
                    )
                  })
                }
              </ul>
            </section>
          {
            attrs.map((attr, attrIdx) => {
              return (
                <section key={`attr-${attrIdx}`}>
                  <p>{attr.name}</p>
                  <ul>
                    {
                      attr.values.map((val,idx) => {
                        return (
                          <li key={`attrvalue-${idx}`} className={classnames({"selected": idx === (attrsArr[attrIdx] || 0)})} onClick={e => this.setAttr(attrIdx, idx)}>{val}</li>
                        )
                      })
                    }
                  </ul>
                </section>
              )
            })
          }
          </div>
          <div className="footer">
            <span className="price"><i>￥</i>{specfoods[specIdx].price}</span><span className="original_price">{activity ? ("￥" + specfoods[specIdx].original_price) : ""}</span>
            <button onClick={() => {
              dispatch(addFoodToCart({
                name: specFood.name,
                price: specfoods[specIdx].price,
                original_price: specfoods[specIdx].original_price || specfoods[specIdx].price,
                count: 1,
                id: specFood.item_id,
                pid: specFood.restaurant_id,
                addtional: this.getAddtionalText(),
                image_hash: specFood.image_path
              }));
              closeSpecModal();
              Alert.success('添加成功',{
                timeout: 1500
              });
            }}>选好了</button>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps() {
    this.resolveState();
  }

  resolveState() {
    let { specFood } = this.props;
    let { attrs } = specFood;
    let { attrsArr } = this.state;
    if (attrs && attrs.length) {
      attrsArr = attrs.map(item => 0);
    }else {
      attrsArr = [];
    }
    this.setState({'specIdx': 0, 'attrsArr': attrsArr});
  }

  setSpec(idx) {
    this.setState({'specIdx': idx});
  }

  setAttr(attrIdx, idx) {
    let { attrsArr } = this.state;
    attrsArr[attrIdx] = idx;
    this.setState({'attrsArr': attrsArr});
  }

  getAddtionalText() {
    let { specFood } = this.props;
    let { specifications, attrs } = specFood;
    let { specIdx, attrsArr } = this.state;

    return specifications[0].name + ": " + specifications[0].values[specIdx] + ", " + attrs.map((attr, aidx) => {
      return attr.name + ": " + attr['values'][attrsArr[aidx] || 0];
    }).join(", ");
  }

}

export default connect()(SpecSelectModalCom);