import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  BarEditor,
  BarScenes,
  BarStatus,
  BarTransport,
} from './';

class Bar extends Component {
  static propTypes = {
    isSettingsView: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.isSettingsView) {
      return (
        <div className='bar'>
          { this.renderStatusPanel() }
        </div>
      );
    }

    return (
      <div className='bar'>
        { this.renderStatusPanel() }

        <div className='bar__panel'>
          <BarTransport />
        </div>

        <div className='bar__panel'>
          <BarScenes />
        </div>

        <div className='bar__panel bar__panel--right'>
          <BarEditor />
        </div>
      </div>
    );
  }

  renderStatusPanel() {
    return (
      <div className='bar__panel'>
        <BarStatus />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSettingsView: state.view.currentView === 'settings',
  };
}

export default connect(
  mapStateToProps
)(Bar);
