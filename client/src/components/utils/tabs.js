import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeTab: this.props.selected ? this.props.selected : this.props.children[0].props.name
    }
  }

  render() {
    const {
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="flex flex-column">
        <div>
          { children.map((child) => {
            return (
              <div className="dib"
                  onClick={() => this.setState({ activeTab: child.props.name })}>
                {child.props.name}
              </div>
            )
          })}
        </div>
        <div>
          { children.map((child) => {
            if (child.props.name !== activeTab) return null;
            return child;
          })}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
  selected: PropTypes.string
};

export default Tabs;
