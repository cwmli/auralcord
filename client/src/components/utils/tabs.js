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
      <div className="flex flex-column h-100">
        <div className={this.props.tabClasses}>
          { children.map((child) => {
            let activeClass = child.props.name === activeTab ? 'bb bw1 b--theme-yellow' : '';

            return (
              <div className={"f5 dib mv4 mr3 pb1 b ttu tracked " + activeClass}
                  onClick={() => this.setState({ activeTab: child.props.name })}>
                {child.props.name}
              </div>
            )
          })}
        </div>
        <div className="flex-auto">
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
