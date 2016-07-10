
import style from './style.css';

import InputOrder from './components/InputOrder';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LinuxShowActions from './actions';


function mapStateToProps(state) {
  console.log(state);
  return {
    state: state.linuxshow,
    linuxInfo: state.linuxshow.linuxInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LinuxShowActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class LinuxShow extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    handleClick: PropTypes.func,
    linuxInfo: PropTypes.string,
  };

  static defaultProps = {
  };
  state = {};
  handleClick(linuxOrder) {
    const { actions } = this.props;
    actions.postLinuxOrder(linuxOrder);
  }
  render() {
    let { linuxInfo } = this.props;
    console.log(linuxInfo);
    linuxInfo = linuxInfo.replace(/\n/g, '<br>');
    console.log(linuxInfo);
    return (
      <div>
        <InputOrder handleClick={(linuxOrder) => this.handleClick(linuxOrder)} />
        <div className={style.info}>
          <div dangerouslySetInnerHTML={{ __html: linuxInfo }} className={style.innerInfo}></div>
        </div>
      </div>
      );
  }
}

export default LinuxShow;
