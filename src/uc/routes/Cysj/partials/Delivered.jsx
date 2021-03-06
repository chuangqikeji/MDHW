import React, { Component } from 'react';
import ListItemPlain from '../../../components/ListItemPlain';
import Loading from '../../../components/Loading';
import scroll from '../../../mixins/scroll';

export default class Delivered extends Component {
  componentDidMount() {
    this.props.fetchDelivered();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmoun() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    scroll(this.props.fetchDelivered);
  }

  render() {
    let content = this.props.data.map((item, index) => (
      <ListItemPlain
        key={index}
        info={`地区: ${item.address}`}
        title={item.title}
        elems={[
          <span className="fontColor">报价: ￥{item.quote}</span>,
          <span>工作周期: {item.worktime}天</span>,
          <a className="list_operate" href="#">查看详情</a>
        ]}
        url={item.url}
      />
    ));
    return (
      <div>
        <ul className="list list-plain">
          {content}
        </ul>
        <Loading
          finished={this.props.finished}
          dataLen={this.props.data.length}
        />
      </div>
    );
  }
}
