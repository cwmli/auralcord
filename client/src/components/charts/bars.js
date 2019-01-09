import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Bars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      xScale: this.props.xScale,
      yScale: this.props.yScale 
    }
  }

  draw(chartObj) {
    let chartNode = d3.select(chartObj.node.current);
    let computedBBox = chartNode.node().getBoundingClientRect();
    let xScale = this.state.xScale || d3.scaleBand()
                                        .domain(d3.range(chartObj.data.length))
                                        .range([0, computedBBox.width]);
    let yScale = this.state.yScale || d3.scaleLinear()
                                        .domain([0, d3.max(chartObj.data, (d) => {return d[1];})])
                                        .range([0, computedBBox.height]);

    chartNode.selectAll('rect')
      .data(chartObj.data)
      .enter()
      .append('rect')
      .attr('x', (_d, i) => {
        return xScale(i).toString() + 'px';
      })
      .attr('y', (d) => {
        return (computedBBox.height - yScale(d[1])).toString() + 'px';
      })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => {
        return yScale(d[1]);
      })
      .attr('class', 'theme-gray');
  }

  render() {
    return (null);
  }
}

export default Bars;
