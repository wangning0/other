import style from './style.css';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Header extends Component {
  static propTypes = {
    style: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;

    return (
      <div
        style={this.props.style}
        className={classnames(...className.split(), style.header)}
      >
        <span className={style.title}>Hello World</span>
      </div>
    );
  }
}

export default Header;
