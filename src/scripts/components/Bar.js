import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BarStatus,
  BarTransport,
} from './';

class Bar extends Component {
  static propTypes = {
    isSettingsView: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div className='bar'>
        <div className='bar__panel'>
          <BarStatus />
        </div>

        { this.renderControls() }
      </div>
    );
  }

  renderControls() {
    if (this.props.isSettingsView) {
      return;
    }

    return (
      <div className='bar__panel'>
        <BarTransport />
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
