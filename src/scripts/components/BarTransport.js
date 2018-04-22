import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { play, stop, record } from '../actions/transport';

class BarTransport extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    isRecording: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    record: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
  }

  onPlayClicked() {
    this.props.play();
  }

  onStopClicked() {
    this.props.stop();
  }

  onRecordClicked() {
    this.props.record();
  }

  render() {
    const playClassName = classnames(
      'button button--clear button-group__item', {
        'button--gray': !this.props.isPlaying,
        'button--green': this.props.isPlaying,
      }
    );

    const stopClassName = classnames(
      'button button--clear button-group__item', {
        'button--gray': this.props.isPlaying,
        'button--blue': !this.props.isPlaying,
      }
    );

    const recordClassName = classnames(
      'button button--clear button-group__item', {
        'button--gray': !this.props.isRecording,
        'button--red': this.props.isRecording,
      }
    );

    return (
      <div className='button-group'>
        <button className={playClassName}>
          <i className='icon icon--play' onClick={this.onPlayClicked} />
        </button>

        <button className={stopClassName}>
          <i className='icon icon--stop' onClick={this.onStopClicked} />
        </button>

        <button className={recordClassName}>
          <i className='icon icon--record' onClick={this.onRecordClicked} />
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.onPlayClicked = this.onPlayClicked.bind(this);
    this.onStopClicked = this.onStopClicked.bind(this);
    this.onRecordClicked = this.onRecordClicked.bind(this);
  }
}

function mapStateToProps(state) {
  return {
    ...state.transport,
  };
}

export default connect(
  mapStateToProps, {
    play,
    record,
    stop,
  }
)(BarTransport);
