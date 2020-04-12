# cubic-spline

A slight modification of [Ivan Kuckir's cubic spline implementation](http://blog.ivank.net/interpolation-with-cubic-splines.html), cubic-spline guesses the value of y for any x value on a line. This is helpful for smoothing line graphs.

The [boundary conditions](https://timodenk.com/blog/cubic-spline-interpolation/#boundary-conditions) used for the spline may be of the "natural" (the default) or "not-a-knot" types.

## installation

```sh
npm install cubic-spline
```

## usage

```js
const Spline = require('cubic-spline');

const xs = [1, 2, 3, 4, 5];
const ys = [9, 3, 6, 2, 4];

// new a Spline object
const spline = new Spline(xs, ys);

// get Y at arbitrary X
console.log(spline.at(1.4));

// interpolate a line at a higher resolution
for (let i = 0; i < 50; i++) {
  console.log(spline.at(i * 0.1));
}

// not-a-knot Spline
const notAKnotSpline = new Spline(xs, ys, { splineType: "not-a-knot" })
```

## test

```sh
npm test
```

## lint

```sh
npm run lint
```
