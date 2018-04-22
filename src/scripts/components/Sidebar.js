import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import player from '../services/player';
import { updateSceneParameter } from '../actions/scenes';

class Sidebar extends Component {
  static propTypes = {
    moduleNames: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    parameter: PropTypes.object,
    scene: PropTypes.object,
    triggerNames: PropTypes.array.isRequired,
    updateSceneParameter: PropTypes.func.isRequired,
  }

  onOptionChanged(event) {
    const { name, value } = event.target;

    const options = Object.assign({}, this.props.options || {}, {
      [name]: value,
    });

    this.props.updateSceneParameter(
      this.props.scene.id,
      this.props.parameter.hash,
      options
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
        <p><strong>{ this.props.parameter.fullname }</strong></p>
      </div>
    );
  }

  renderMain() {
    const { options } = this.props;

    return (
      <div className='sidebar__panel'>
        <div className='sidebar__group'>
          <label className='sidebar__label'>Trigger</label>

          <select
            className='sidebar__input'
            name='triggerName'
            value={options.triggerName}
            onChange={this.onOptionChanged}
          >
            <option value=''>No trigger selected</option>
            { this.renderTriggers() }
          </select>
        </div>

        <div className='sidebar__group'>
          <label className='sidebar__label'>Module</label>

          <select
            className='sidebar__input'
            name='moduleName'
            value={options.moduleName}
            onChange={this.onOptionChanged}
          >
            <option value=''>No module selected</option>
            { this.renderModules() }
          </select>
        </div>
      </div>
    );
  }

  renderTriggers() {
    return this.props.triggerNames.map((triggerName, index) => {
      return <option key={index} value={triggerName}>{ triggerName }</option>;
    });
  }

  renderModules() {
    return this.props.moduleNames.map((moduleName, index) => {
      return <option key={index} value={moduleName}>{ moduleName }</option>;
    });
  }

  constructor(props) {
    super(props);

    this.onOptionChanged = this.onOptionChanged.bind(this);
  }
}

function mapStateToProps(state) {
  const { scenes } = state.scenes;
  const { setup } = state.setup;

  const defaultValues = {
    moduleName: '',
    moduleOptions: {},
    triggerName: '',
    triggerOptions: {},
  };

  const parameter = setup.parameters.find(parameter => {
    return state.editor.currentParameterHash === parameter.hash;
  });

  const scene = scenes.find(scene => {
    return scene.id === state.scenes.currentSceneId;
  });

  const hasValues = parameter && (parameter.hash in scene.parameters);
  const options = hasValues ? scene.parameters[parameter.hash] : defaultValues;

  const playerOptions = player.getOptions();
  const moduleNames = Object.keys(playerOptions.modules);
  const triggerNames = Object.keys(playerOptions.triggers);

  return {
    moduleNames,
    options,
    parameter,
    scene,
    triggerNames,
  };
}

export default connect(
  mapStateToProps, {
    updateSceneParameter,
  }
)(Sidebar);
