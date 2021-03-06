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
    let content = this.props.data.map((item, index) => (
      <ListItem
        key={index}
        {...item}
        img={`${item.frontpic}.jpg`}
        multiple={{ '进度': item.progress, '状态': item.status }}
        title={item.title}
        small={item.name}
        emp={['目标', item.moneys]}
        other={`￥${item.summoney}`}
      />
    ));

    return (
      <div>
        <ul className="list">
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
