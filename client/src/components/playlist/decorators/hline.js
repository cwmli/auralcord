export default function horizontalLine (selection, chartObj) {

  selection.on('mouseenter', (d, _i) => {
    chartObj.node.append('line')
                 .attr('class', 'hline theme-yellow-stroke')
                 .attr('stroke-linecap', 'round')
                 .attr('stroke-width', '2')
                 .attr('stroke-dasharray', '10,5')
                 .attr('x1', 0)
                 .attr('y1', chartObj.scale.y(d[1]))
                 .attr('x2', chartObj.width)
                 .attr('y2', chartObj.scale.y(d[1]));
    
    let text = chartObj.node.append('text');
    text.attr('class', 'hline-text')
        .text(Math.round(d[1]) + ' BPM');

    let textbbox = text.node().getBBox();
    text.attr('transform', 'translate(' + (chartObj.width - textbbox.width) + ',' + chartObj.margin.top + ')')
  });

  selection.on('mouseleave', () => {
    chartObj.node.selectAll('.hline').remove();
    chartObj.node.selectAll('.hline-text').remove();
  });
};
