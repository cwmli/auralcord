import React, { Component } from 'react';
import * as d3 from 'd3';

export const TOP = 'top';
export const RIGHT = 'right';
export const BOTTOM = 'bottom';
export const LEFT = 'left';

class Axis extends Component {

  getAxis(placement, xscale, yscale) {
    switch(placement) {
      case TOP:
        return d3.axisTop().scale(xscale);
      case RIGHT:
        return d3.axisRight().scale(yscale);
      case BOTTOM:
        return d3.axisBottom().scale(xscale);
      case LEFT:
        return d3.axisLeft().scale(yscale);
      default:
        return d3.axisBottom().scale(xscale);
    }
  }

  draw(chartObj) {

    chartObj.node.append('g')
             .attr('transform', 'translate(0,' +  chartObj.height + ')')
             .call(this.getAxis(this.props.placement, chartObj.scale.x, chartObj.scale.y));
  }

  render() {
    return (null);
  }
}

export default Axis;
