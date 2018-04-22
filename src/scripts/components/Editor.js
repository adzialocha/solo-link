import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { Parameter, Sidebar } from './';
import { selectParameter } from '../actions/editor';

class Editor extends Component {
  static propTypes = {
    currentSceneId: PropTypes.number,
    isSidebarExpanded: PropTypes.bool.isRequired,
    parameterIds: PropTypes.array.isRequired,
    parameters: PropTypes.array.isRequired,
    selectParameter: PropTypes.func.isRequired,
  }

  onParameterSelected(id) {
    this.props.selectParameter(id);
  }

  render() {
    if (!this.props.currentSceneId) {
      return null;
    }

    const className = classnames('editor', {
      'editor--sidebar-expanded': this.props.isSidebarExpanded,
    });

    return (
      <div className={className}>
        <div className='editor__parameters'>
          { this.renderParameters() }
        </div>

        { this.renderSidebar() }
      </div>
    );
  }

  renderParameters() {
    return this.props.parameterIds.map(id => {
      const parameter = this.props.parameters.find(p => p.id === id);

      if (!parameter) {
        return null;
      }

      return (
        <div
          className='editor__parameters-item'
          key={id}
        >
          <Parameter
            parameter={parameter}
            onSelected={this.onParameterSelected}
          />
        </div>
      );
    });
  }

  renderSidebar() {
    if (!this.props.isSidebarExpanded) {
      return null;
    }

    return (
      <div className='editor__sidebar'>
        <Sidebar />
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.onParameterSelected = this.onParameterSelected.bind(this);
  }
}

function mapStateToProps(state) {
  return {
    ...state.editor,
    currentSceneId: state.scenes.currentSceneId,
    parameterIds: state.settings.parameterIds,
    parameters: state.setup.setup.parameters,
  };
}

export default connect(
  mapStateToProps, {
    selectParameter,
  }
)(Editor);
