import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-selection';

class Bars extends Component {

  constructor(props) {
    super(props)


  }

  draw(chartObj) {
    let chartNode = d3.select(chartObj.node.current);
    let computedBBox = chartNode.node().getBoundingClientRect();

    chartNode.selectAll('rect')
      .data(chartObj.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return (i * (computedBBox.width / chartObj.data.length)).toString() + 'px';
      })
      .attr('y', (d) => {
        return (computedBBox.height - d).toString() + 'px';
      })
      .attr("width", computedBBox.width / chartObj.data.length)
      .attr('height', (d) => {
        return d;
      })
  }

  render() {
    return (null);
  }
}

export default Bars;
