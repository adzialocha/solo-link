import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeViewTo } from '../actions/view';

class Navigation extends Component {
  static propTypes = {
    changeViewTo: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
  }

  onStatusClicked() {
    if (this.props.current !== 'settings') {
      this.props.changeViewTo('settings');
    } else {
      this.props.changeViewTo('editor');
    }
  }

  render() {
    return (
      <div className='navigation'>
        { this.renderStatus() }
      </div>
    );
  }

  renderStatus() {
    return (
      <button onClick={this.onStatusClicked}>
        Status
      </button>
    );
  }

  constructor(props) {
    super(props);

    this.onStatusClicked = this.onStatusClicked.bind(this);
  }
}

function mapStateToProps(state) {
  return state.view;
}

export default connect(
  mapStateToProps, {
    changeViewTo,
  }
)(Navigation);
