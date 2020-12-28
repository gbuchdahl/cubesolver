import React, { useCallback, useMemo, useState } from 'react';
import Cube from './Cube';

interface InputControllerProps {}

interface ColorCombination {
  centerColor: string;
  rightColor: string;
  topColor: string;
}

interface CubeState {
  F: string[];
  R: string[];
  B: string[];
  L: string[];
  D: string[];
  T: string[];
}

const InputController = (props: InputControllerProps) => {
  const [cubeState, setCubeState] = useState<CubeState>({
    F: Array(9).fill('E'),
    R: Array(9).fill('E'),
    B: Array(9).fill('E'),
    L: Array(9).fill('E'),
    D: Array(9).fill('E'),
    T: Array(9).fill('E'),
  });

  // Front: Green
  // Right: Orange
  // Back: Blue
  // Left: Red
  // Down: White
  // Top: Yellow
  const colorCombinations: { [color: string]: ColorCombination } = {
    F: { centerColor: 'G', rightColor: 'O', topColor: 'Y' },
    R: { centerColor: 'O', rightColor: 'B', topColor: 'Y' },
    B: { centerColor: 'B', rightColor: 'R', topColor: 'Y' },
    L: { centerColor: 'R', rightColor: 'G', topColor: 'Y' },
    D: { centerColor: 'W', rightColor: 'O', topColor: 'G' },
    T: { centerColor: 'Y', rightColor: 'O', topColor: 'B' },
  };
  const faces = Object.keys(colorCombinations);
  const [currentFaceIndex, setFaceIndex] = useState(0);
  const currentFace = useMemo(() => faces[currentFaceIndex], [currentFaceIndex, faces]);

  const handleNextFace = useCallback(() => {
    setFaceIndex(currentFaceIndex + (1 % 6));
  }, [currentFaceIndex]);

  const handleChange = useCallback(
    (value: string[]) => {
      setCubeState({ ...cubeState, [currentFace]: value });
    },
    [cubeState, currentFace]
  );

  return (
    <>
      <div className={'row'}>
        <div className={'col-8'}>
          <Cube
            {...colorCombinations[currentFace]}
            onChange={handleChange}
            onNextFace={handleNextFace}
          />
        </div>
      </div>
    </>
  );
};

export default InputController;
