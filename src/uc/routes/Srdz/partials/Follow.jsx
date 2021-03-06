import React, { Component } from 'react';
import ListItem from '../../../components/ListItem';
import Loading from '../../../components/Loading';
import scroll from '../../../mixins/scroll';

export default class Follow extends Component {
  componentDidMount() {
    this.props.fetchFollow();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmoun() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    scroll(this.props.fetchFollow);
  }

  render() {
    let contentList = this.props.data.map((item, index) => (
      <ListItem
        key={index}
        {...item}
        title={<a className="list_operate" href={item.url}>{item.title}</a>}
        img={`${item.productlmg}.jpg`}
        multiple={{ '成交量': item.num }}
        emp={['单价', item.price]}
        small={item.name}
        other={<span className="list_operate">取消关注</span>}
        delFollow={this.props.delFollow}
        index={index}
      />
    ));
    return (
      <div>
        <ul className="list">
          {contentList}
        </ul>
        <Loading
          finished={this.props.finished}
          dataLen={this.props.data.length}
        />
      </div>
    );
  }
}
