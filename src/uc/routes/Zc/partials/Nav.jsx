import React from 'react';
import Navbar from '../../../components/Navbar';
import getHash from '../../../mixins/getHash';

export default React.createClass({
  mixins: [getHash],
  render: function () {
    return (
      <div>
        <Navbar to="/zc/follow" text="关注列表" icon="star" />
        <Navbar to="/zc/support" text="支持列表" icon="thumbs-o-up" />
        <Navbar to="/zc/order" text="订单列表" icon="list" />
      </div>
    );
  }
});