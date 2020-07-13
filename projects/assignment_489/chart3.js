d3.csv('death_rate.csv', (data) => {
  const height = 450;
  const width = 750;
  const margin = { top: 25, right: 20, bottom: 35, left: 40 };

  const columns = data.columns.slice(1);
  // console.log(columns);

  var data = data.map((d) => ({
    name: d.state,
    x: +d.cases,
    y: +d.deaths,
    ratio: +d.death_rate,
  }));
  // .filter((d) => d.x > 10000 && d.y > 1000);
  // console.log(data);

  const svg = d3
    .select('body')
    .append('svg')
    .attr('id', 'svg3')
    .attr('viewBox', [0, 0, width, height]);

  x = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .nice()
    .range([margin.left, width - margin.right]);

  y = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.y))
    .nice()
    .range([height - margin.bottom, margin.top]);

  xAxis = (g) =>
    g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 100))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', width)
          .attr('y', margin.bottom - 4)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text('Cases →')
      );

  yAxis = (g) =>
    g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(width / 100))
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('↑ Deaths')
      );

  grid = (g) =>
    g
      .attr('stroke', 'currentColor')
      .attr('stroke-opacity', 0.1)
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(x.ticks())
          .enter()
          .append('line')
          .attr('x1', (d) => 0.5 + x(d))
          .attr('x2', (d) => 0.5 + x(d))
          .attr('y1', margin.top)
          .attr('y2', height - margin.bottom)
      )
      .call((g) =>
        g
          .append('g')
          .selectAll('line')
          .data(y.ticks())
          .enter()
          .append('line')
          .attr('y1', (d) => 0.5 + y(d))
          .attr('y2', (d) => 0.5 + y(d))
          .attr('x1', margin.left)
          .attr('x2', width - margin.right)
      );

  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
  svg.append('g').call(grid);

  color = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.ratio))
    .range(['blue', 'red']);

  // console.log(d3.extent(data, (d) => d.ratio));

  svg
    .append('g')
    // .attr('fill', (d) => color(d.ratio))
    .attr('opacity', 0.5)
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => x(d.x))
    .attr('cy', (d) => y(d.y))
    .attr('r', 6)
    .attr('fill', (d) => color(d.ratio));

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dy', '0.35em')
    .attr('x', (d) => x(d.x) + 7)
    .attr('y', (d) => y(d.y))
    .text((d) => d.name);
});
