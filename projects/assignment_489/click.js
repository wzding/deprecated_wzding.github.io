document.getElementById('container').onclick = function (e) {
  // clean svg object
  d3.selectAll('svg').remove();

  var target = e.target;
  if (target.id.substr(0, 6) === 'button') {
    var body = document.getElementsByTagName('body')[0];
    var js = document.createElement('script');
    js.type = 'text/javascript';

    var nextElementId = target.id.substr(6);

    if (nextElementId == '1') {
      js.src = 'chart1.js';
    } else if (nextElementId == '2') {
      js.src = 'chart2.js';
    } else {
      js.src = 'chart3.js';
    }
    body.appendChild(js);
  }
};
