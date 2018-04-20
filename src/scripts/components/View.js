import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  EditorView,
  SettingsView,
} from '../views';

class View extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className='view'>
        { this.renderContent() }
      </div>
    );
  }

  renderContent() {
    if (this.props.current === 'settings') {
      return <SettingsView />;
    }

    return <EditorView />;
  }
}

function mapStateToProps(state) {
  return state.view;
}

export default connect(
  mapStateToProps
)(View);
