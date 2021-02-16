const express = require('express');
const Cube = require('cubejs');
const app = express();
const port = 8080;

Cube.initSolver();

app.get('/solve/:cube', (req, res) => {
  const cubeStr = req.params.cube;

  if (cubeStr.length !== 54) {
    throw new Error('Invalid cube length');
  }

  let cubeObj = Cube.fromString(cubeStr);
  const solve = cubeObj.solve();
  res.json({ success: true, solve });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});