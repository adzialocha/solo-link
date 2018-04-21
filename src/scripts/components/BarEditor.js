import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addScene, removeScene } from '../actions/scenes';

class BarEditor extends Component {
  static propTypes = {
    addScene: PropTypes.func.isRequired,
    currentSceneId: PropTypes.number,
    removeScene: PropTypes.func.isRequired,
  }

  onAddSceneClicked() {
    this.props.addScene();
  }

  onRemoveSceneClicked() {
    const result = window.confirm('Are you sure?');

    if (result) {
      this.props.removeScene(this.props.currentSceneId);
    }
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

        { this.renderRemoveSceneButton() }

        <button
          className='button button--round button--blue button-group__item'
          onClick={this.onAddSceneClicked}
        >
          <i className='icon icon--add' />
        </button>
      </div>
    );
  }

  renderRemoveSceneButton() {
    if (!this.props.currentSceneId) {
      return;
    }

    return (
      <button
        className='button button--round button--red button-group__item'
        onClick={this.onRemoveSceneClicked}
      >
        <i className='icon icon--remove' />
      </button>
    );
  }

  constructor(props) {
    super(props);

    this.onAddSceneClicked = this.onAddSceneClicked.bind(this);
    this.onRemoveSceneClicked = this.onRemoveSceneClicked.bind(this);
    this.onSidebarToggleClicked = this.onSidebarToggleClicked.bind(this);
  }
}

function mapStateToProps(state) {
  return {
    currentSceneId: state.scenes.currentSceneId,
  };
}

export default connect(
  mapStateToProps, {
    addScene,
    removeScene,
  }
)(BarEditor);
