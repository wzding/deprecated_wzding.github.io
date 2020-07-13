export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([
    [
      'unemployment.tsv',
      new URL(
        './files/b154f8efd1a64d5e3e829b93e4fefd6d72219371ef440007fe368369fea0bbcdc9bcac06b72aae851f392411102931eba7774befa8c8fcbfcad4fc28f136ecd6',
        import.meta.url
      ),
    ],
  ]);

  main.builtin(
    'FileAttachment',
    runtime.fileAttachments((name) => fileAttachments.get(name))
  );

  main
    .variable(observer('chart'))
    .define(
      'chart',
      ['d3', 'width', 'height', 'xAxis', 'yAxis', 'data', 'line', 'hover'],
      function (d3, width, height, xAxis, yAxis, data, line, hover) {
        const svg = d3
          .create('svg')
          .attr('viewBox', [0, 0, width, height])
          .style('overflow', 'visible');

        svg.append('g').call(xAxis);

        svg.append('g').call(yAxis);

        const path = svg
          .append('g')
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .selectAll('path')
          .data(data.series)
          .join('path')
          .style('mix-blend-mode', 'multiply')
          .attr('d', (d) => line(d.values));

        svg.call(hover, path);

        return svg.node();
      }
    );

  main
    .variable(observer('hover'))
    .define('hover', ['d3', 'x', 'y', 'data'], function (d3, x, y, data) {
      return function hover(svg, path) {
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
          .attr('font-size', 10)
          .attr('text-anchor', 'middle')
          .attr('y', -8);

        function moved() {
          d3.event.preventDefault();
          const mouse = d3.mouse(this);
          const xm = x.invert(mouse[0]);
          const ym = y.invert(mouse[1]);
          const i1 = d3.bisectLeft(data.dates, xm, 1);
          const i0 = i1 - 1;
          const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
          const s = d3.least(data.series, (d) => Math.abs(d.values[i] - ym));
          path
            .attr('stroke', (d) => (d === s ? null : '#ddd'))
            .filter((d) => d === s)
            .raise();
          dot.attr(
            'transform',
            `translate(${x(data.dates[i])},${y(s.values[i])})`
          );
          dot.select('text').text(s.name);
        }

        function entered() {
          path.style('mix-blend-mode', null).attr('stroke', '#ddd');
          dot.attr('display', null);
        }

        function left() {
          path.style('mix-blend-mode', 'multiply').attr('stroke', null);
          dot.attr('display', 'none');
        }
      };
    });

  main
    .variable(observer('line'))
    .define('line', ['d3', 'x', 'data', 'y'], function (d3, x, data, y) {
      return d3
        .line()
        .defined((d) => !isNaN(d))
        .x((d, i) => x(data.dates[i]))
        .y((d) => y(d));
    });

  main.variable(observer('d3')).define('d3', ['require'], function (require) {
    return require('d3@5', 'd3-array@2');
  });

  return main;
}
