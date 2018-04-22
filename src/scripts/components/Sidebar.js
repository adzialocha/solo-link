import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTriggerNames, getModuleNames } from '../services/player';
import { updateSceneParameter } from '../actions/scenes';

class Sidebar extends Component {
  static propTypes = {
    parameter: PropTypes.object,
    scene: PropTypes.object,
    updateSceneParameter: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  }

  onValueChanged(event) {
    const { name, value } = event.target;

    const values = Object.assign({}, this.props.values || {}, {
      [name]: value,
    });

    this.props.updateSceneParameter(
      this.props.scene.id,
      this.props.parameter.id,
      values
    );
  }

  render() {
    if (!this.props.parameter) {
      return (
        <div className='sidebar'>
          <p>No parameter selected</p>
        </div>
      );
    }

    return (
      <div className='sidebar'>
        { this.renderHeader() }
        { this.renderMain() }
      </div>
    );
  }

  renderHeader() {
    return (
      <div className='sidebar__panel'>
        <p>
          <strong>{ this.props.parameter.name }</strong>
          <span> (#{ this.props.parameter.id })</span>
        </p>
      </div>
    );
  }

  renderMain() {
    const { values } = this.props;
    const currentTrigger = 'trigger' in values ? values.trigger : '-1';
    const currentModule = 'module' in values ? values.module : '-1';

    return (
      <div className='sidebar__panel'>
        <div className='sidebar__group'>
          <label className='sidebar__label'>Trigger</label>

          <select
            className='sidebar__input'
            name='trigger'
            value={currentTrigger}
            onChange={this.onValueChanged}
          >
            <option value='-1'>No trigger selected</option>
            { this.renderTriggers() }
          </select>
        </div>

        <div className='sidebar__group'>
          <label className='sidebar__label'>Module</label>

          <select
            className='sidebar__input'
            name='module'
            value={currentModule}
            onChange={this.onValueChanged}
          >
            <option value='-1'>No module selected</option>
            { this.renderModules() }
          </select>
        </div>
      </div>
    );
  }

  renderTriggers() {
    return getTriggerNames().map((triggerKey, index) => {
      return (
        <option
          key={index}
        >
          { triggerKey }
        </option>
      );
    });
  }

  renderModules() {
    return getModuleNames().map((moduleKey, index) => {
      return (
        <option
          key={index}
        >
          { moduleKey }
        </option>
      );
    });
  }

  constructor(props) {
    super(props);

    this.onValueChanged = this.onValueChanged.bind(this);
  }
}

function mapStateToProps(state) {
  const { setup } = state.setup;
  const parameter = setup.parameters.find(parameter => {
    return state.editor.currentParameterId === parameter.id;
  });

  const scene = state.scenes.scenes.find(scene => {
    return scene.id === state.scenes.currentSceneId;
  });

  const values = scene ? scene.parameters[state.editor.currentParameterId] : {};

  return {
    scene,
    parameter,
    values: values || {},
  };
}

export default connect(
  mapStateToProps, {
    updateSceneParameter,
  }
)(Sidebar);
