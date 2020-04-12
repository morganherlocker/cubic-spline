const Spline = require("./");
const test = require("tape");

test("spline", function(t) {
  const xs = [1, 2, 3, 4, 5];
  const ys = [9, 3, 6, 2, 4];

  // new a Spline object
  const spline = new Spline(xs, ys);

  // get Y at arbitrary X
  t.equal(spline.at(1.4), 5.586);

  // interpolate a line at a higher resolution
  for (var i = 0; i < 50; i++) {
    t.equal(typeof spline.at(i * 0.1), "number");
  }
  t.end();
});

test("speed", function(t) {
  let arraySizes = [10, 100, 1000, 2000, 4000];
  let arraySpeed = [];
  let arrayInitialization = [];
  let multiplicationFactor = 10; // array.length * multiplicationFactor = number of times the .at()-function is executed on the same array
  for (let i = 0; i < arraySizes.length; i++) {
    // generate x-y-set
    let setX = [];
    let setY = [];
    let x = 0;
    let y = 0;
    for (let j = 0; j < arraySizes[i]; j++) {
      x += 0.05;
      y = Math.sin(x);
      setX.push(x.toFixed(2));
      setY.push(y.toFixed(4));
    }
    // run cubic-spline-interpolation
    let initializationStart = new Date();
    const spline = new Spline(setX, setY);
    let initializationEnd = new Date();
    // interpolate spline at 10x resolution
    let atStart = new Date();
    for (let j = 0; j < arraySizes[i] * multiplicationFactor; j++) {
      spline.at(j * 0.05 + 0.01); // create a small offset to the actual data set
    }
    let atEnd = new Date();
    arrayInitialization[i] = initializationEnd - initializationStart;
    arraySpeed[i] = atEnd - atStart;
  }
  // print result
  console.log(`elements in | times .at() | initialization | execution time`);
  console.log(`dataset     | is used     | time of spline | of all .at()'s`);
  console.log(`------------|-------------|----------------|---------------`);
  for (let i = 0; i < arraySizes.length; i++) {
    let size = arraySizes[i].toString().padEnd(11);
    let at = (arraySizes[i] * multiplicationFactor).toString().padStart(11);
    let initializationTime = arrayInitialization[i].toString().padStart(12);
    let atTime = arraySpeed[i].toString().padStart(12);
    console.log(`${size} | ${at} | ${initializationTime}ms | ${atTime}ms`);
  }
  t.end();
});

test("not-a-knot spline", function(t) {
  const xs = [0, 1, 2, 3, 4, 5];
  const ys = [0, -1.5, -2.0, -1.5, 0.0, 2.5];

  // new not-a-knot Spline object
  const spline = new Spline(xs, ys, { splineType: "not-a-knot" });

  const interpolant = [0.3, 0.5, 1.2, 3.9, 4.1, 4.999];
  const expected = [-0.555, -0.875, -1.68, -0.195, 0.205, 2.4970005];

  for (var i = 0; i < expected.length; i++) {
    t.equal(roundToN(spline.at(interpolant[i]) - expected[i], 8), 0);
  }
  t.end();
});

function roundToN(x, n) {
  return Math.round((x + Number.EPSILON) * Math.pow(10, n)) / Math.pow(10, n);
}
