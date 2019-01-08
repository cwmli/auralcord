import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-selection';

class Bars extends Component {

  constructor(props) {
    super(props)


  }

  draw(chartObj) {
    console.log(chartObj);
    d3.select(chartObj.node.current)
      .selectAll('rect')
      .data(chartObj.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return (i * (chartObj.width / chartObj.data.length)).toString() + 'px';
      })
      .attr('y', (d) => {
        return (chartObj.height - d).toString() + 'px';
      })
      .attr("width", chartObj.width / chartObj.data.length)
      .attr('height', (d) => {
        return d;
      })
  }

  render() {
    return (null);
  }
}

export default Bars;
