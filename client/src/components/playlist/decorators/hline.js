export default function horizontalLine (selection, chartObj) {

  selection.on('mouseenter', (d) => {
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
        .text(d[1].toFixed(2));

    let textbbox = text.node().getBBox();
    text.attr('transform', 'translate(' + (chartObj.width - textbbox.width) + ',' + chartObj.margin.top + ')')

    // DOM Stuff
    let playlistItem = document.getElementById(d[0]);
    playlistItem.scrollIntoView({ behavior: 'smooth' });
    playlistItem.classList.add('bg-theme-yellow');
  });

  selection.on('mouseleave', (d) => {
    let playlistItem = document.getElementById(d[0]);
    playlistItem.classList.remove('bg-theme-yellow');

    chartObj.node.selectAll('.hline').remove();
    chartObj.node.selectAll('.hline-text').remove();
  });
};
