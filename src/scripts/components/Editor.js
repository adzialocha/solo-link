import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { EditorParameter } from './';

class Editor extends Component {
  static propTypes = {
    currentSceneId: PropTypes.number,
    isSidebarExpanded: PropTypes.bool.isRequired,
    parameterIds: PropTypes.array.isRequired,
    parameters: PropTypes.array.isRequired,
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
        <div className='editor__parameters-item' key={id}>
          <EditorParameter parameter={parameter} />
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
        <p>Sidebar</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.editor,
    currentSceneId: state.scenes.currentSceneId,
    parameterIds: state.settings.parameterIds,
    parameters: state.setup.parameters,
  };
}

export default connect(
  mapStateToProps
)(Editor);
