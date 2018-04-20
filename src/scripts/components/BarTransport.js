import React, { Component } from 'react';

class BarTransport extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className='button-group'>
        <button
          className='button button--clear button--green button-group__item'
        >
          <i className='icon icon--play' />
        </button>

        <button
          className='button button--clear button--red button-group__item'
        >
          <i className='icon icon--record' />
        </button>
      </div>
    );
  }
}

export default BarTransport;
