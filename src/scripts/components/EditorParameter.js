import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditorParameter extends Component {
  static propTypes = {
    parameter: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className='editor-parameter'>
        { this.props.parameter.name }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(EditorParameter);
