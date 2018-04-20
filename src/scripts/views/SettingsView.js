import React, { Component } from 'react';

import {
  SettingsNetwork,
  SettingsDevices,
} from '../components';

class SettingsView extends Component {
  render() {
    return (
      <section className='settings-view'>
        <div className='settings-view__panel'>
          <h2>Network</h2>
          <SettingsNetwork />
        </div>

        <div className='settings-view__panel'>
          <h2>Devices</h2>
          <SettingsDevices />
        </div>
      </section>
    );
  }
}

export default SettingsView;
