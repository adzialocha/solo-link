import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addParameterId, removeParameterId } from '../actions/settings';

class SetupList extends Component {
  static propTypes = {
    addParameterId: PropTypes.func.isRequired,
    parameterIds: PropTypes.array.isRequired,
    removeParameterId: PropTypes.func.isRequired,
    setup: PropTypes.object.isRequired,
  }

  onParameterChanged(event) {
    const { name, checked } = event.target;
    const id = parseInt(name, 10);

    if (!checked) {
      this.props.removeParameterId(id);
    } else {
      this.props.addParameterId(id);
    }
  }

  render() {
    return (
      <div className='setup-list'>
        <ul className='setup-list__tracks'>
          { this.renderTracks(this.props.setup.tracks) }
        </ul>
      </div>
    );
  }

  renderTracks(tracks) {
    return tracks.map(track => {
      const devices = this.props.setup.devices.filter(device => {
        return track.deviceIds.includes(device.id);
      });

      return (
        <li className='setup-list__tracks-item' key={track.id}>
          <strong>Name: { track.name }</strong>

          <ul className='setup-list__devices'>
            { this.renderDevices(devices) }
          </ul>
        </li>
      );
    });
  }

  renderDevices(devices) {
    return devices.map(device => {
      const parameters = this.props.setup.parameters.filter(parameter => {
        return device.parameterIds.includes(parameter.id);
      });

      return (
        <li className='setup-list__devices-item' key={device.id}>
          <strong>Name: { device.name }</strong>

          <ul className='setup-list__parameters'>
            { this.renderParameters(parameters) }
          </ul>
        </li>
      );
    });
  }

  renderParameters(parameters) {
    return parameters.map(parameter => {
      return (
        <li className='setup-list__parameters-item' key={parameter.id}>
          <strong>Name: { parameter.name }</strong>
          <p>Min: { parameter.min }</p>
          <p>Max: { parameter.max }</p>

          <input
            checked={this.props.parameterIds.includes(parameter.id)}
            name={parameter.id}
            type='checkbox'
            onChange={this.onParameterChanged}
          />
        </li>
      );
    });
  }

  constructor(props) {
    super(props);

    this.onParameterChanged = this.onParameterChanged.bind(this);
  }
}

function mapStateToProps(state) {
  const {
    parameterIds,
  } = state.settings;

  return {
    parameterIds,
  };
}

export default connect(
  mapStateToProps, {
    addParameterId,
    removeParameterId,
  }
)(SetupList);
