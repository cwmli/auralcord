import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
class D3Chart extends Component {

  constructor(props) {
    super(props);

    this.chart = React.createRef();
    this.childRefs = [];
  }

  drawChart(initialDraw = false) {
    const { data, margin, xscale, yscale } = this.props;

    let chartNode = d3.select(this.chart.current);
    let computedBBox = chartNode.node().getBoundingClientRect();
    let computedHeight = computedBBox.height - margin.top - margin.bottom;
    let computedWidth = computedBBox.width - margin.right - margin.left;

    if (initialDraw) {
      chartNode = chartNode.append('g')
                  .attr('transform', 'translate(' + margin.left + ',' +  margin.top + ')');
    }
    // pass chart object down for children to perform their draws
    this.childRefs.forEach((ref) => {

      ref.draw({
        node: chartNode, 
        data: data,
        width: computedWidth,
        height: computedHeight,
        margin: margin,
        scale: { x: xscale.range([0, computedWidth]),
                 y: yscale.range([0, computedHeight])}
      });
    })
  }

  componentDidMount() {
    this.drawChart(true);
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
