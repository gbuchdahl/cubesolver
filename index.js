const express = require("express");
const Cube = require("cubejs");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("client/build"));

Cube.initSolver();

app.get("/api/solve/:cube", (req, res) => {
  const cubeStr = req.params.cube;

  if (cubeStr.length !== 54) {
    throw new Error("Invalid cube length");
  }

  let cubeObj = Cube.fromString(cubeStr);
  const solve = cubeObj.solve();
  res.json({ success: true, solve });
});

app.listen(port, "0.0.0.0");
