import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Parameter extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    onSelected: PropTypes.func.isRequired,
    parameter: PropTypes.object.isRequired,
  }

  onSelected() {
    this.props.onSelected(this.props.parameter.hash);
  }

  render() {
    const className = classnames('parameter', {
      'parameter--selected': this.props.isSelected,
    });

    return (
      <div className={className} onClick={this.onSelected}>
        { this.props.parameter.fullname }
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.onSelected = this.onSelected.bind(this);
  }
}

function mapStateToProps(state, props) {
  return {
    isSelected: state.editor.currentParameterHash === props.parameter.hash,
  };
}

export default connect(
  mapStateToProps
)(Parameter);
