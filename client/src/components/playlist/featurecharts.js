import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';
import D3Chart from '../charts/chart';
import Bars from '../charts/bars';
import Lines from '../charts/lines';
import Axis from '../charts/axis';
import horizontalLine from './decorators/hline';

class FeatureChart extends Component {

  render() {
    const {
      xDomain,
      chartData,
      title,
      lineData,
      labelMapping
    } = this.props

    return (
      <div className="pa3 min-h-100">
        <dl className="mt2 dib mb1 lh-copy h-100">
          <dd className="ml0 f4 black b w-100">{title}</dd>
          <dd className="ml0 h-100">
            <D3Chart 
              width="100%"
              height="100%"
              margin={{top: 10, right: 10, bottom: 200, left: 50}}
              xscale={
                d3.scaleBand()
                  .domain(xDomain)
                  .padding(.25)}
              yscale={
                d3.scaleLinear()
                  .domain([d3.max(chartData, (d) => {return d[1];}), 0])}
              zoommethod={(scale, chartObj) => {return scale.range([0, chartObj.width].map(d => d3.event.transform.applyX(d)))}}
              data={chartData}>
              <Bars decorator={horizontalLine} />
              <Lines data={lineData} />
              <Axis 
                placement='bottom'
                labelMapping={labelMapping}
                rotatedText={true}/>
              <Axis placement='left' />
            </D3Chart>
          </dd>
        </dl>
      </div>
    )
  }
}

FeatureChart.PropTypes = {
  xDomain: PropTypes.array.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.array).isRequired,
  lineData: PropTypes.array.isRequired,
  title: PropTypes.string,
  labelMapping: PropTypes.objectOf(PropTypes.string)
}

export default FeatureChart;
