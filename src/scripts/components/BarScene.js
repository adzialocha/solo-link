// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BarScene extends Component {
  static propTypes = {
  }

  onAddSceneClicked() {
  }

  onSidebarToggleClicked() {
  }

  render() {
    return (
      <div className='button-group'>
        <button
          className='button button--round button--gray button-group__item'
          onClick={this.onSidebarToggleClicked}
        >
          <i className='icon icon--toggle' />
        </button>

        <button
          className='button button--round button--blue button-group__item'
          onClick={this.onAddSceneClicked}
        >
          <i className='icon icon--add' />
        </button>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.onAddSceneClicked = this.onAddSceneClicked.bind(this);
    this.onSidebarToggleClicked = this.onSidebarToggleClicked.bind(this);
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(BarScene);
