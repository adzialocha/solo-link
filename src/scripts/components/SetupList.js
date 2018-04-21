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
        <ul className='setup-list__root'>
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

      if (devices.length === 0) {
        return;
      }

      return (
        <li className='setup-list__item setup-list__item--track' key={track.id}>
          <span className='setup-list__badge'>Track</span>
          <strong>{ track.name }</strong>

          <ul className='setup-list__inner'>
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
        <li className='setup-list__item setup-list__item--device' key={device.id}>
          <span className='setup-list__badge'>Device</span>
          <strong>{ device.name }</strong>

          <ul className='setup-list__inner'>
            { this.renderParameters(parameters) }
          </ul>
        </li>
      );
    });
  }

  renderParameters(parameters) {
    return parameters.map(parameter => {
      return (
        <li className='setup-list__item setup-list__item--parameter' key={parameter.id}>
          <label className='setup-list__parameters-label'>
            <div className='setup-list__parameters-name'>
              <span className='setup-list__badge'>Parameter</span>
              <strong>{ parameter.name }</strong>

              <span className='setup-list__parameters-values'>
                ({ parameter.min } - { parameter.max })
              </span>
            </div>

            <input
              className='setup-list__parameters-checkbox'
              checked={this.props.parameterIds.includes(parameter.id)}
              name={parameter.id}
              type='checkbox'
              onChange={this.onParameterChanged}
            />
          </label>
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
