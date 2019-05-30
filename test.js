const Spline = require('./');
const test = require('tape');

test('spline', function(t) {
  const xs = [1, 2, 3, 4, 5];
  const ys = [9, 3, 6, 2, 4];

  // new a Spline object
  const spline = new Spline(xs, ys);

  // get Y at arbitrary X
  t.equal(spline.at(1.4), 5.586);

  // interpolate a line at a higher resolution
  for (var i = 0; i < 50; i++) {
    t.equal(typeof spline.at(i * 0.1), 'number');
  }
  t.end();
});
