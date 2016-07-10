import style from './style.css';
import { Button, Input } from 'antd';
import React, { Component, PropTypes } from 'react';

class Name extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fooActions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleClick() {
    this.props.fooActions.changeName(this.state.name);
  }

  render() {
    const { name } = this.state;
    return (
      <div className={style.name}>
        <span>Name: {this.props.name}</span>
        <Input className={style.label} value={name} onChange={this.handleChange} />
        <Button onClick={this.handleClick} >Change Name</Button>
      </div>
    );
  }
}


export default Name;
