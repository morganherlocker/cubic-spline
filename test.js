var spline = require('./');
var test = require('tape');

test('spline', function(t){
  var xs = [1,2,3,4,5];
  var ys = [9,3,6,2,4];

  // get Y at arbitrary X
  t.equal(spline(1.4, xs, ys), 5.586);

  // interpolate a line at a higher resolution
  for(var i = 0; i < 50; i++) {
    t.equal(typeof spline(i*.1, xs, ys), 'number');
  }
  t.end();
});