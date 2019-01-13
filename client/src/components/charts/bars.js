import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Bars extends Component {

  draw(chartObj) {

    function createBars(selection) {
      selection.attr('x', (d) => {
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

    let bars = chartObj.node.selectAll('.bar');

    bars.data(chartObj.data)
        .enter()
        .append('rect')
        .call(createBars);

    bars.call(createBars);

    if (this.props.decorator) {
      bars.call(this.props.decorator);
    }
  }

  render() {
    return (null);
  }
}

Bars.PropTypes = {
  decorator: PropTypes.func,
}

export default Bars;
