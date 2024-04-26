import "./App.css";
import React, { useState} from "react";
import Plot from "react-plotly.js";

function App() {
  return (
    <div className="App">
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [1, 4, 9],
          },
        ]}
        layout={{ autosize: true }}
      />
    </div>
  );
}

export default App;
