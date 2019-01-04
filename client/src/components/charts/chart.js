import React, { Component } from 'react';
import PropTypes from 'prop-types';

class D3Chart extends Component {

  constructor(props) {
    super(props);

    this.chart = React.createRef();
  }

  componentDidMount() {
    drawChart();
  }

  componentDidUpdate(prevProps) {
    drawChart();
  }

  drawChart() {
    // do any modifications to chart node before
    // performing on children

    this.props.children.map((child) => {
      child.draw(this.chart.current);
    });
  }

  render() {
     return (
      <svg ref={this.chart} width={this.props.width} height={this.props.height} />
    )
  }

}

D3Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.number,
  data: PropTypes.array
}

export default D3Chart;
