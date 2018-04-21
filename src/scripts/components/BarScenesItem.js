import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

class BarScenes extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    label: PropTypes.number.isRequired,
    onSceneSelected: PropTypes.func.isRequired,
    scene: PropTypes.object.isRequired,
  }

  onClicked() {
    this.props.onSceneSelected(this.props.scene.id);
  }

  render() {
    const className = classnames('button button--round button--clear button-group__item', {
      'button--blue': this.props.isSelected,
    });

    return (
      <button
        className={className}
        onClick={this.onClicked}
      >
        { this.props.label }
      </button>
    );
  }

  constructor(props) {
    super(props);

    this.onClicked = this.onClicked.bind(this);
  }
}

export default BarScenes;
