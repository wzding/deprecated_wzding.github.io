d3.csv('2020-06.csv', (data) => {
  const height = 450;
  const width = 754;
  const margin = { top: 20, right: 20, bottom: 30, left: 45 };

  const columns = data.columns.slice(1);
  // console.log(columns);

  var data = {
    series: data.map((d) => ({
      name: d.state,
      values: columns.map((k) => +d[k]),
    })),
    dates: columns.map(d3.utcParse('%Y-%m-%d')),
  };

  // data = data.filter((d) => {
  //   d.dates > '2020-06-30';
  // });

  const svg = d3
    .select('body')
    .append('svg')
    .attr('id', 'svg1')
    .attr('viewBox', [0, 0, width, height])
    .style('overflow', 'visible');

  var x = d3
    .scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right]);

  var y = d3
    .scaleLinear()
    .domain([0, 12000])
    // .domain([0, d3.max(data.series, (d) => d3.max(d.values))])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line()
    .defined((d) => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y((d) => y(d));

  color = d3
    .scaleOrdinal()
    .domain(data.series.map((d) => d.name))
    .range(d3.schemeSpectral[11]);

  const path = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-width', 1)
    .attr('stroke', 'firebrick')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .selectAll('path')
    .data(data.series)
    .enter()
    .append('path')
    .style('mix-blend-mode', 'multiply')
    .attr('d', (d) => line(d.values));
  // .attr('stroke', (d) => color(d.name));

  const xAxis = d3
    .axisBottom(x)
    .ticks(width / 80)
    .tickSizeOuter(0);

  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  const yAxis = d3.axisLeft(y);
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis)
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .select('.tick:last-of-type text')
        .clone()
        .attr('x', 3)
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text('COVID-19 Cases')
    );

  svg.call(hover, path);

  function hover(svg, path) {
    if ('ontouchstart' in document)
      svg
        .style('-webkit-tap-highlight-color', 'transparent')
        .on('touchmove', moved)
        .on('touchstart', entered)
        .on('touchend', left);
    else
      svg
        .on('mousemove', moved)
        .on('mouseenter', entered)
        .on('mouseleave', left);

    const dot = svg.append('g').attr('display', 'none');

    dot.append('circle').attr('r', 2.5);

    dot
      .append('text')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 8)
      .attr('text-anchor', 'middle')
      .attr('y', -8);

    // console.log(data.dates);
    // console.log(data.series);

    function moved() {
      d3.event.preventDefault();
      const mouse = d3.mouse(this);
      const xm = x.invert(mouse[0]);
      const ym = y.invert(mouse[1]);
      const i1 = d3.bisectLeft(data.dates, xm, 1);
      const i0 = i1 - 1;
      const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;

      const s = d3.least(data.series, (d) => Math.abs(d.values[i] - ym));
      // console.log(s);

      path
        .attr('stroke', (d) => (d === s ? null : '#ddd'))
        .filter((d) => d === s)
        .raise();

      dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values[i])})`);
      dot.select('text').text(s.name + ' ' + s.values[i]);
    }

    function entered() {
      path.style('mix-blend-mode', null).attr('stroke', '#ddd');
      dot.attr('display', null);
    }

    function left() {
      path.style('mix-blend-mode', 'multiply').attr('stroke', null);
      dot.attr('display', 'none');
    }
  }
});
