import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
class D3Chart extends Component {

  constructor(props) {
    super(props);

    this.chart = React.createRef();
    this.childRefs = [];

    this.zoomed = this.zoomed.bind(this);
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    const { data, margin, xscale, yscale } = this.props;

    let chartNode = d3.select(this.chart.current);
    let computedBBox = chartNode.node().getBoundingClientRect();
    let computedHeight = computedBBox.height - margin.top - margin.bottom;
    let computedWidth = computedBBox.width - margin.right - margin.left;
    let zoom = d3.zoom()
                 .scaleExtent([1, 32])
                 .translateExtent([[0, 0], [computedWidth, computedHeight]])
                 .extent([[0, 0], [computedWidth, computedHeight]])
                 .on("zoom", this.zoomed);

    chartNode = chartNode.append('g')
                         .attr('transform', 'translate(' + margin.left + ',' +  margin.top + ')')
                         .call(zoom);

    this.setState({
      node: chartNode,
      data: data,
      xscale: xscale.range([0, computedWidth]),
      yscale: yscale.range([0, computedHeight]),
      computedBBox: computedBBox,
      computedHeight: computedHeight,
      computedWidth: computedWidth
    });

    this.drawChart();
  }

  componentDidUpdate(prevProps) {
    this.drawChart();
  }

  chartObj() {
    return {
      node: this.state.node, 
      data: this.state.data,
      width: this.state.computedWidth,
      height: this.state.computedHeight,
      margin: this.props.margin,
      scale: { x: this.state.xscale,
               y: this.state.yscale }
    }
  }

  zoomed() {
    let xt = this.props.zoommethod(this.state.xscale, this.chartObj());
    this.setState({xscale: xt});
  }

  drawChart() {
    // pass chart object down for children to perform their draws
    if (this.state && this.state.node) {
      this.childRefs.forEach((ref) => {

        ref.draw(this.chartObj());
      })
    }
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
  xscale: PropTypes.object.isRequired,
  yscale: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  zoommethod: PropTypes.func,
}

export default D3Chart;
