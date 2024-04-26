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
  subtract
} from "mathjs";

class ArrayNotMatchingError extends Error {
  constructor(message) {
    if (!message) message = "Array sizes did NOT match";
    super(message);
    this.name = this.constructor.name;
  }
}

// axis=0 returns all x-values of array, axis=1 returns y-values etc.
function getAxisVals(array, axis) {
  array = matrix(array);
  const n = size(array).get([0]);
  return flatten(subset(array, index(range(0, n), axis)));
}

// axis=0 returns (x, y) of body 0, axis=1 body 2 etc.
function getCoordinates(array, axis) {
  array = matrix(array);
  const n = size(array).get([0]);
  return flatten(subset(array, index(axis, range(0, n))));
}

function newtonGravity(r) {
  r = matrix(r);
  // Assumes masses = 1 for now
  const G = 6.67e-11; // Gravitational constant
  return multiply(divide(r, norm(r) ** 3), -(G * 1 * 1));
}

console.log(newtonGravity([0, 1]).toArray())

function linalgDist(r1, r2) {
  const numBodies = r1.length;
  if (numBodies !== r2.length) throw new ArrayNotMatchingError();
  return norm(r1 - r2);
}

function App() {
  // Interval delay
  const SECONDS = 2;
  const MILLI_SECONDS = SECONDS * 1000;

  // INITIAL CONDITIONS
  const [position, setPosition] = useState(
    matrix([
      [0, 1], // (x, y) for body 1
      [1, 2], // (x, y) for body 2
    ])
  );
  const [velocity, setVelocity] = useState(
    matrix([
      [0, 1], // (vx, vy) for body 1
      [1, 2], // (vx, vy) for body 2
    ])
  );

  const NUM_BODIES = position.size()[0];

  const [data, setData] = useState([
    {
      // Extracts and reshapes [[1,2],[3,4]] to [1, 3] (x-values)
      x: getAxisVals(position, 0).toArray(),
      // Does the same for y-values
      y: getAxisVals(position, 1).toArray(),
      mode: "markers",
      marker: { size: 20 },
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const numBodies = data[0].x.length;
      const x = Array(numBodies);
      const y = Array(numBodies);
      const vx = Array(numBodies);
      const vy = Array(numBodies);
      let r1;
      let r2;
      let diff;

      // Update positions from gravitational force
      for (let i = 0; i < numBodies - 1; i++) {
        for (let j = i + 1; j < numBodies; j++) {
          r1 = getCoordinates(position, i); // body i
          r2 = getCoordinates(position, j); // body j
          diff = subtract(r1, r2);

          // Gravity between these two
          vx[i] -= newtonGravity(diff) * SECONDS;

        }
      }
      console.log("loops done");

      setData([
        {
          x: x,
          y: y,
          marker: { size: data[0].marker.size },
        },
      ]);
    }, MILLI_SECONDS);

    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <Plot data={data} layout={{ autosize: true }} />
    </div>
  );
}

export default App;
