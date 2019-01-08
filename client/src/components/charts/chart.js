import React, { Component } from 'react';
import PropTypes from 'prop-types';
class D3Chart extends Component {

  constructor(props) {
    super(props);

    this.chart = React.createRef();
    this.childRefs = [];
  }

  drawChart() {
    // pass chart object down for children to perform their draws
    this.childRefs.forEach((ref) => {
      const { data, width, height, margin } = this.props;

      ref.draw({
        node: this.chart, 
        data: data, 
        width: width,
        height: height,
        margin: margin
      });
    })
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    this.drawChart();
  }

  render() {
    // antipattern: hook up child chart components for DOM manip in drawChart()
    const children = React.Children.map(this.props.children, (child, i) => {
      this.childRefs[i] = React.createRef();
      return React.cloneElement(child, { ref: (dom) => this.childRefs[i] = dom });
    });

    return (
      <svg ref={this.chart} width={this.props.width} height={this.props.height}>
        {children}
      </svg>
    )
  }

}

D3Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  data: PropTypes.array
}

export default D3Chart;
