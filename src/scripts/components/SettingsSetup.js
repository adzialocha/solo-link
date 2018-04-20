import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadAbletonSetup } from '../actions/settings';

class SettingsSetup extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    loadAbletonSetup: PropTypes.func.isRequired,
    setup: PropTypes.object.isRequired,
  }

  onLoadClicked(event) {
    event.preventDefault();

    this.props.loadAbletonSetup();
  }

  render() {
    return (
      <form className='form'>
        <div className='form__actions'>
          <div className='button-group'>
            <button
              type='submit'
              className='button button-group__item'
              disabled={this.props.isLoading || !this.props.isOpen}
              onClick={this.onLoadClicked}
            >
              Load from Ableton Live
            </button>
          </div>
        </div>
      </form>
    );
  }

  constructor(props) {
    super(props);

    this.onLoadClicked = this.onLoadClicked.bind(this);
  }
}

function mapStateToProps(state) {
  const { tracks, devices, parameters, isLoading } = state.settings.setup;

  return {
    isLoading,
    isOpen: state.osc.isOpen,
    setup: {
      devices,
      parameters,
      tracks,
    },
  };
}

export default connect(
  mapStateToProps, {
    loadAbletonSetup,
  }
)(SettingsSetup);
