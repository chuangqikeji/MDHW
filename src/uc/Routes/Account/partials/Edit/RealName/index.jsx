import React from 'react';
import FormInput from '../../../../../components/FormInput';
import { $parent } from 'func';

export default React.createClass({
  handleClick: function (e) {
    $parent(e.target, 'li').querySelector('input').value = '';
  },
  render: function () {
    const icon = <span onClick={this.handleClick}><i className="fa fa-times-circle"></i></span>;
    const text = this.props.res.temp.p_realname || '未填写';
    return (
      <form>
        <FormInput
          value={text}
          field="p_realname"
          btn={icon}
          onChange={this.props.res.onChange}
          onKeyup={this.props.res.onChange}
        />
      </form>
    );
  }
});
