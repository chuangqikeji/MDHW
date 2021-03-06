import React, { Component } from 'react';

export default class FormAddress extends Component {
  componentDidMount() {
    if (!this.props.areaData.length) this.props.fetchAreaData();
  }

  handleChange(e, type) {
    this.props.onAreaChange(type, e.target.value);
  }

  render() {
    return (
      <div className="formAddress">
        <div className="formAddress_select">
          <select value={this.props.area.province.code} onChange={(e) => this.handleChange(e, 'province')}>
            {
              this.props.areaData.map((item, index) => (
                <option key={index} value={item.code}>{item.name}</option>
              ))
            }
          </select>
          <select value={this.props.area.city.code} onChange={(e) => this.handleChange(e, 'city')}>
            {
              this.props.area.province.citys && this.props.area.province.citys.map((item, index) => (
                <option key={index} value={item.code}>{item.name}</option>
              ))
            }
          </select>
          <select value={this.props.area.district.code} onChange={(e) => this.handleChange(e, 'district')}>
            {
              this.props.area.city.districts && this.props.area.city.districts.map((item, index) => (
                <option key={index} value={item.code}>{item.name}</option>
              ))
            }
          </select>
        </div>
        {
          this.props.hideTextarea ?
            null :
            (<textarea
              className="formAddress_detail"
              name={this.props.address}
              placeholder="请输入详细地址"
              value={this.props.value || ''}
              onChange={(e) => this.props.onChange(this.props.name, e.target.value.trim())}
            >
            </textarea>)
        }
      </div>
    );
  }
}
