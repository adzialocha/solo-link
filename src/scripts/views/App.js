import React, { Component } from 'react';

import {
  Navigation,
  View,
} from '../components';

class App extends Component {
  render() {
    return (
      <main className='app' role='application'>
        <Navigation />
        <View />
      </main>
    );
  }
}

export default App;
