import "./App.css";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import {
  norm,
  matrix,
  divide,
  index,
  range,
  size,
  subset,
  flatten,
  multiply,
  subtract,
  add,
} from "mathjs";

class ArrayNotMatchingError extends Error {
  constructor(message) {
    if (!message) message = "Array sizes did NOT match";
    super(message);
    this.name = this.constructor.name;
  }
}

// axis=0 returns all x-values of array, axis=1 returns y-values etc.
function getColumn(array, axis) {
  array = matrix(array);
  const n = size(array).get([0]);
  return flatten(subset(array, index(range(0, n), axis)));
}

// axis=0 returns (x, y) of body 0, axis=1 body 2 etc.
function getRow(array, axis) {
  array = matrix(array);
  const n = size(array).get([0]);
  return flatten(subset(array, index(axis, range(0, n))));
}

function replaceAxis(array, axis, newVal) {
  const n = size(array).get([0]);
  return subset(array, index(axis, range(0, n)), newVal);
}

function newtonGravity(r) {
  r = matrix(r);
  // Assumes masses = 1 for now
  // const G = 6.67e-11; // Gravitational constant
  const G = 1e-2;
  return multiply(divide(r, norm(r) ** 3), -(G * 1 * 1));
}

function linalgDist(r1, r2) {
  const numBodies = r1.length;
  if (numBodies !== r2.length) throw new ArrayNotMatchingError();
  return norm(r1 - r2);
}

function App() {
  const MILLI_SECONDS = 50;
  const SECONDS = MILLI_SECONDS / 1000; // Interval delay
  const SIZE = 20; // body marker size

  // INITIAL CONDITIONS
  const [position, setPosition] = useState(
    matrix([
      [0, 0], // (x, y) for body 1
      [1, 1], // (x, y) for body 2
    ])
  );
  const [velocity, setVelocity] = useState(
    matrix([
      [0, 0], // (vx, vy) for body 1
      [0, 0], // (vx, vy) for body 2
    ])
  );

  const NUM_BODIES = position.size()[0];

  const layout = {
  autosize: true,
  xaxis: {
    autorange: false,
    // range: [-10, 10],
  },
  // yaxis: {
  // },
};

  const [data, setData] = useState([
    {
      // Extracts and reshapes [[1,2],[3,4]] to [1, 3] (x-values)
      x: getColumn(position, 0).toArray(),
      // Does the same for y-values
      y: getColumn(position, 1).toArray(),
      mode: "markers",
      marker: { size: SIZE },
    },
  ]);

  function updateData() {
    setData([
      {
        x: getColumn(position, 0).toArray(),
        y: getColumn(position, 1).toArray(),
        mode: "markers",
        marker: { size: SIZE },
      },
    ]);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let r1;
  //     let r2;
  //     let v1;
  //     let v2;
  //     let diff;
  //     let change;

  //     // Update positions from gravitational force
  //     for (let i = 0; i < NUM_BODIES - 1; i++) {
  //       for (let j = i + 1; j < NUM_BODIES; j++) {
  //         r1 = getRow(position, i); // body i
  //         r2 = getRow(position, j); // body j
  //         v1 = getRow(velocity, i); // body i
  //         v2 = getRow(velocity, j); // body j
  //         diff = subtract(r2, r1);

  //         // console.log(r1.toArray());
  //         // console.log(r2.toArray());
  //         // console.log(v1.toArray());
  //         // console.log(v2.toArray());
  //         console.log(diff.toArray());

  //         // Gravity between these two bodies, first body:
  //         change = multiply(newtonGravity(diff), SECONDS);
  //         console.log(change.toArray());
  //         v1 = subtract(v1, change);
  //         r1 = add(r1, multiply(v1, SECONDS));

  //         // Seconds body is equal, but opposite:
  //         v2 = subtract(v2, multiply(change, -1));
  //         r2 = add(r2, multiply(v2, SECONDS));

  //         console.log(r1.toArray());
  //         console.log(r2.toArray());
  //         console.log(v1.toArray());
  //         console.log(v2.toArray());

  //         setVelocity(matrix([v1, v2]));
  //         setPosition(matrix([r1, r2]));
  //       }
  //     }
  //     console.log("loops done");

  //     console.log(getColumn(position, 0).toArray());
  //     console.log(getColumn(position, 1).toArray());

  //     // Update positions on plot
  //     updateData();
  //   }, MILLI_SECONDS);

  //   return () => clearInterval(interval);
  // });

  return (
    <div className="App">
      <Plot data={[{x:[0, 1], y:[0, 1]}]} layout={{ layout }} />
    </div>
  );
}

export default App;
