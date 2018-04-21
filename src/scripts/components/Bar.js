import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BarScene,
  BarStatus,
  BarTransport,
} from './';

class Bar extends Component {
  static propTypes = {
    isSettingsView: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.isSettingsView) {
      return this.renderSettingsBar();
    }

    return (
      <div className='bar'>
        <div className='bar__panel'>
          <BarStatus />
        </div>

        <div className='bar__panel'>
          <BarTransport />
        </div>

        <div className='bar__panel bar__panel--right'>
          <BarScene />
        </div>
      </div>
    );
  }

  renderSettingsBar() {
    return (
      <div className='bar'>
        <div className='bar__panel'>
          <BarStatus />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSettingsView: state.view.current === 'settings',
  };
}

export default connect(
  mapStateToProps
)(Bar);
