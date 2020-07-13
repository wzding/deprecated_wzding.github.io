d3.csv('month-aggregation.csv', (data) => {
  // console.log(data);
  var margin = { top: 40, right: 30, bottom: 0, left: 80 };

  // data
  const columns = data.columns.slice(1);

  var data = data.map((d) => ({
    name: d.state,
    category: d.category,
    value: d.count,
  }));

  Object.assign(data, {
    format: ',.2r',
    negative: '← Deaths',
    positive: 'Cases →',
    negatives: ['d-2020-07', 'd-2020-06', 'd-2020-05', 'd-2020-04', 'd-2020-03',
    'd-2020-02', 'd-2020-01'],
    positives: ['c-2020-01', 'c-2020-02', 'c-2020-03', 'c-2020-04', 'c-2020-05',
    'c-2020-06', 'c-2020-07'],
  });
  // console.log(data);

  const signs = new Map(
    [].concat(
      data.negatives.map((d) => [d, -1]),
      data.positives.map((d) => [d, +1])
    )
  );

  const bias = d3
    .rollups(
      data,
      (v) => d3.sum(v, (d) => d.value * Math.min(0, signs.get(d.category))),
      (d) => d.name
    )
    .sort(([, a], [, b]) => d3.ascending(a, b));
  console.log(bias); // only name + negative values 

  const series = d3
    .stack()
    .keys([].concat(data.negatives.slice().reverse(), data.positives))
    .value(
      ([, value], category) => signs.get(category) * (value.get(category) || 0)
    )
    .offset(d3.stackOffsetDiverging)(
    d3.rollups(
      data,
      (data) =>
        d3.rollup(
          data,
          ([d]) => d.value,
          (d) => d.category
        ),
      (d) => d.name
    )
  );
  // console.log(series);

  var height = bias.length * 15 + margin.top + margin.bottom;
  var width = 700;

  // x and y axises
  x = d3
    .scaleLinear()
    .domain(d3.extent(series.flat(2)))
    .rangeRound([margin.left, width - margin.right]);

  y = d3
    .scaleBand()
    .domain(bias.map(([name]) => name))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(2 / 33);

  const format = d3.format(data.format || "");
  formatValue = (x) => format(Math.abs(x));

  // svg
  const svg = d3
    .select('body')
    .append('svg')
    .attr('id', 'svg2')
    .attr('viewBox', [0, 0, width, height]);

  color = d3
    .scaleOrdinal()
    .domain([].concat(data.negatives, data.positives))
    .range(d3.schemeSpectral[Math.min(11, data.negatives.length + data.positives.length)]);

  // console.log(color);
  xAxis = (g) =>
    g
      .attr('transform', `translate(0,${margin.top})`)
      .call(
        d3
          .axisTop(x)
          .ticks(width / 60)
          .tickSizeOuter(0)
      )
      .call((g) => g.select('.domain').remove())
      .call((g) =>
        g
          .append('text')
          .attr('x', x(0) + 20)
          .attr('y', -24)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(data.positive)
      )
      .call((g) =>
        g
          .append('text')
          .attr('x', x(0) - 20)
          .attr('y', -24)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text(data.negative)
      );

  yAxis = (g) =>
    g
      .call(d3.axisLeft(y).tickSizeOuter(0))
      .call((g) =>
        g
          .selectAll('.tick')
          .data(bias)
          .attr(
            'transform',
            ([name, min]) =>
              `translate(${x(min)},${y(name) + y.bandwidth() / 2})`
          )
      )
      .call((g) =>
        g.select('.domain').attr('transform', `translate(${x(0)},0)`)
      );
      
  svg
    .append('g')
    .selectAll('g')
    .data(series)
    .enter()
    .append('g')
    .attr('fill', (d) => color(d.key))
    .selectAll('rect')
    .data((d) => d.map((v) => Object.assign(v, { key: d.key })))
    .enter()
    .append('rect')
    .attr('x', (d) => x(d[0]))
    .attr('y', ({ data: [name] }) => y(name))
    .attr('width', (d) => x(d[1]) - x(d[0]))
    .attr('height', y.bandwidth())
    .append('title')
    .text(
      ({ key, data: [name, value] }) => `${key.substring(2, 9)} ${formatValue(value.get(key))}`
    );

  svg.append('g').call(xAxis);
  svg.append('g').call(yAxis);
});
