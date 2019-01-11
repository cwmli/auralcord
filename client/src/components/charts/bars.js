import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Bars extends Component {

  draw(chartObj) {

    chartObj.node.selectAll('rect')
      .data(chartObj.data)
      .enter()
      .append('rect')
      .attr('x', (d) => {
        return chartObj.scale.x(d[0]).toString() + 'px';
      })
      .attr('y', (d) => {
        return chartObj.scale.y(d[1]).toString() + 'px';
      })
      .attr('width', chartObj.scale.x.bandwidth())
      .attr('height', (d) => {
        return chartObj.height - chartObj.scale.y(d[1]);
      })
      .attr('class', 'theme-gray bar');
  }

  render() {
    return (null);
  }
}

export default Bars;
