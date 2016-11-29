import React from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { register, unregister, wrapAction } from './actions';


const connectUUID = (name, mapStateToProps, mapDispatchToProps) => (Component) => {
  const wrapMapStateToProps = (state, { uuid, ...props }) => {
    if (_.isNil(mapStateToProps)) return {};

    return mapStateToProps(
      state.uuid[name][uuid],
      props
    );
  };

  const wrapMapDispatchToProps = (dispatch, { uuid, ...props }) => {
    if (_.isNil(mapDispatchToProps)) return {};

    if (_.isPlainObject(mapDispatchToProps)) {
      // memoize wrapped actions by passing a thunk
      return () => bindActionCreators(
        mapDispatchToProps, (action) => {
          return _.isFunction(action)
            ? action((action) => dispatch(wrapAction(action, name, uuid)))
            : dispatch(wrapAction(action, name, uuid));
        }
      );
    }

    return mapDispatchToProps(dispatch, props);
  };

  const ConnectedComponent = connect(
    wrapMapStateToProps,
    wrapMapDispatchToProps
  )(Component);

  class ConnectUUID extends React.Component {
    componentWillMount() {
      this.uuid = v4();
      this.props.register(name, this.uuid);
    }

    componentWillUnmount() {
      this.props.unregister(name, this.uuid);
    }

    render() {
      return React.createElement(
        ConnectedComponent,
        Object.assign({}, this.props, { uuid: this.uuid })
      );
    }
  }

  return connect(
    null, { register, unregister }
  )(ConnectUUID);
};

export default connectUUID;
