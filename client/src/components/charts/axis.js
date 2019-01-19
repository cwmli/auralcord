import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export const TOP = 'top';
export const RIGHT = 'right';
export const BOTTOM = 'bottom';
export const LEFT = 'left';

class Axis extends Component {

  getAxis(selection, placement, chartObj) {
    switch(placement) {
      case TOP:
        return selection.call(d3.axisTop().scale(chartObj.scale.x).tickSize(0))
                        .attr('class', 'top--axis');
      case RIGHT:
        return selection.call(d3.axisRight().scale(chartObj.scale.y).tickSize(0))
                        .attr('class', 'right--axis')
                        .attr('transform', 'translate(' + chartObj.width + ', 0)');
      case BOTTOM:
        return selection.call(d3.axisBottom().scale(chartObj.scale.x).tickSize(0))
                        .attr('class', 'bottom--axis')
                        .attr('transform', 'translate(0,' +  chartObj.height + ')')
                        .selectAll("text")
                        .attr("y", 0)
                        .attr("x", 9)
                        .attr("dy", ".35em")
                        .attr("transform", "rotate(90)")
                        .style("text-anchor", "start");
      case LEFT:
        return selection.call(d3.axisLeft().scale(chartObj.scale.y).tickSize(0))
                        .attr('class', 'left--axis');
    }
  }

  draw(chartObj) {

    let axis = chartObj.node.select('.' + this.props.placement + '--axis');
    if (axis.empty()) {
      chartObj.node.append('g')
                   .call(this.getAxis, this.props.placement, chartObj);
    } else {
      axis.call(this.getAxis, this.props.placement, chartObj);
    }
  }

  render() {
    return (null);
  }
}

Axis.PropTypes = {
  placement: PropTypes.string.isRequired,
  rotatedText: PropTypes.bool,
}

export default Axis;
