import style from './style.css';
import { Button, Input } from 'antd';
import React, { Component, PropTypes } from 'react';


class Message extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  static contextTypes = {
    fooActions: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      message: this.props.message,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleClick() {
    this.context.fooActions.changeMessage(this.state.message);
  }

  render() {
    const { message } = this.state;
    return (
      <div className={style.message}>
        <span>Message: {this.props.message}</span>
        <Input className={style.label} value={message} onChange={this.handleChange} />
        <Button onClick={this.handleClick} >Change Message</Button>
      </div>
    );
  }
}

export default Message;
