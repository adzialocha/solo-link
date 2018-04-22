import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    parameter: PropTypes.object,
  }

  onSelected() {
  }

  render() {
    return (
      <div className='sidebar'>
        { this.renderSidebar() }
      </div>
    );
  }

  renderSidebar() {
    if (!this.props.isSelected) {
      return <p>No parameter selected</p>;
    }

    return (
      <p>{ this.props.parameter.name }</p>
    );
  }

  constructor(props) {
    super(props);

    this.onSelected = this.onSelected.bind(this);
  }
}

function mapStateToProps(state) {
  const { setup } = state.setup;
  const parameter = setup.parameters.find(parameter => {
    return state.editor.currentParameterId === parameter.id;
  });

  return {
    isSelected: state.editor.currentParameterId !== null,
    parameter,
  };
}

export default connect(
  mapStateToProps
)(Sidebar);
