import axios from 'axios';
import { CubeState } from '../templates/InputController';
import { cubeStateToString } from './colors';

/** Return the solve */
export const getSolve = async (cube: CubeState) => {
  const cubeString = cubeStateToString(cube);
  const response = await axios.get(`/api/solve/${cubeString}`);
  return response.data.solve;
};

const faceToSentence: { [key: string]: string } = {
  F: 'Rotate the front face',
  U: 'Rotate the top face',
  B: 'Rotate the back face',
  D: 'Rotate the bottom face',
  R: 'Rotate the right face',
  L: 'Rotate the left face',
};

type Direction = 'clockwise' | 'counterclockwise' | 'twice';

interface VerboseInstruction {
  originalDirection: string;
  sentence: string;
  direction: Direction;
}

export const solveToVerboseInstructions = (solve: string): VerboseInstruction[] => {
  const solveSteps = solve.split(' ');
  return solveSteps.map((step) => {
    const direction: Direction = step[1]
      ? step[1] === "'"
        ? 'counterclockwise'
        : 'twice'
      : 'clockwise';
    return {
      originalDirection: step,
      sentence: faceToSentence[step[0]],
      direction,
    };
  });
};
