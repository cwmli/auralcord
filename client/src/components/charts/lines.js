import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class Lines extends Component {

  draw(chartObj) {
    let line = d3.line()
                 .x((d) => { return chartObj.scale.x(d[0]); })
                 .y((d) => { return chartObj.scale.y(d[1]); });
    
    let path = chartObj.node.select('.line');

    if (path.empty()) {
      let data = this.props.data ? this.props.data : chartObj.data;

      path = chartObj.node.append('path')
                          .datum(data)
                          .style('fill', 'none')
                          .attr('class', 'line');
    }

    path.attr('d', line)
  }

  render() {
    return (null);
  }
}

Lines.PropTypes = {
  data: PropTypes.array.isRequired,
}

export default Lines;
