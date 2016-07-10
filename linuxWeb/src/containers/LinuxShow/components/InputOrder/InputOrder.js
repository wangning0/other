
import style from './style.css';

import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';


class InputOrder extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  state = {};
  getInputValue() {
    return this.refs.input.value;
  }
  handleSubmit() {
    const { handleClick } = this.props;
    console.log(handleClick);
    handleClick(this.getInputValue());
  }
  render() {
    const { className } = this.props;

    return (
      <div
        style={this.props.style}
        className={classnames(...className.split(), style.inputorder)}
      >
        <p className={style.raw}>
          <span>Linux命令：</span>
          <input ref="input" className={style.input} />
          <button onClick={() => this.handleSubmit()} className={style.btn}>执行</button>
        </p>
      </div>
    );
  }
}

export default InputOrder;
