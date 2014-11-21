cubic-spline
===

A slight modification of [Ivan Kuckir's cubic spline implementation](http://blog.ivank.net/interpolation-with-cubic-splines.html), cubic-spline guesses the value of y for any x value on a line. This is helpful for smoothing line graphs.

###install

```sh
npm install cubic-spline
```

###usage

```js
var spline = require('cubic-spline');

var xs = [1,2,3,4,5];
var ys = [9,3,6,2,4];

// get Y at arbitrary X
console.log(spline(1.4, xs, ys));

// interpolate a line at a higher resolution
for(var i = 0; i < 50; i++) {
    console.log(spline(i*.1, xs, ys));
}
```

###test

```sh
npm test
```