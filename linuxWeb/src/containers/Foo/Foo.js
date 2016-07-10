import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FooActions from 'containers/Foo/actions';
import Name from 'components/Name';
import Header from './components/Header';
import Message from './components/Message';


function mapStateToProps(state) {
  const { foo } = state;
  return { foo };
}

function mapDispatchToProps(dispatch) {
  return {
    fooActions: bindActionCreators(FooActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Foo extends Component {
  static propTypes = {
    foo: PropTypes.object.isRequired,
    fooActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    foo: PropTypes.object,
    fooActions: PropTypes.object,
  };

  getChildContext() {
    const { foo, fooActions } = this.props;
    return { foo, fooActions };
  }

  render() {
    const { name, message } = this.props.foo.toJS();
    return (
      <div className={style.content}>
        <Header />
        <div className={style.main} >
          <Name name={name} fooActions={this.props.fooActions} />
          <Message message={message} />
        </div>
      </div>
    );
  }
}

export default Foo;
