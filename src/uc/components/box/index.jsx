import React from 'react';
import ItemBox from './ItemBox.jsx';

const Index = React.createClass({
  render: function () {
    return (
      <div className="indexBox">
        <ItemBox data={this.props.data.resultPro} />
        <ItemBox data={this.props.data.resultAdd} />
        <ItemBox data={this.props.data.resultOther} />
        <ItemBox data={this.props.data.resultPri} />
        <ItemBox data={this.props.data.resultFx} />
      </div>
    );
  }
});

export default Index;