import PropTypes from 'prop-types';
import React, { Component } from 'react';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    return (
      <main className='app' role='application'>
        { this.props.children }
      </main>
    );
  }
}

export default App;
