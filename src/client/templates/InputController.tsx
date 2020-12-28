import React, { useCallback, useMemo, useState } from 'react';
import Cube from '../components/Cube';
import ProgressTracker from '../components/ProgressTracker';
import { colorCombinations } from '../core/colors';

interface InputControllerProps {}

export interface CubeState {
  F: string[];
  R: string[];
  B: string[];
  L: string[];
  D: string[];
  T: string[];
}

const InputController = (props: InputControllerProps) => {
  const [cubeState, setCubeState] = useState<CubeState>({
    F: Array(9).fill(''),
    R: Array(9).fill(''),
    B: Array(9).fill(''),
    L: Array(9).fill(''),
    D: Array(9).fill(''),
    T: Array(9).fill(''),
  });

  const isComplete = (side: keyof CubeState) =>
    cubeState[side].filter((el) => el !== '').length === 9;

  const faces = Object.keys(colorCombinations);
  const [currentFaceIndex, setFaceIndex] = useState(0);
  const currentFace = useMemo(() => faces[currentFaceIndex], [currentFaceIndex, faces]);

  const handleNextFace = useCallback(() => {
    setFaceIndex((currentFaceIndex + 1) % 6);
  }, [currentFaceIndex]);

  const handleChange = useCallback(
    (value: string[]) => {
      setCubeState({ ...cubeState, [currentFace]: value });
      console.log(cubeState);
    },
    [cubeState, currentFace]
  );

  return (
    <>
      <div className={'row'}>
        <div className={'col-8 card no-gutters'}>
          <Cube
            {...colorCombinations[currentFace]}
            onChange={handleChange}
            onNextFace={handleNextFace}
            cubeState={cubeState}
          />
          <div className="row my-4 justify-content-center">
            {Object.entries(colorCombinations).map(([face, { centerColor }], index) => (
              <div className="col-2">
                <ProgressTracker
                  color={centerColor}
                  isDone={isComplete(face as keyof CubeState)}
                  onClick={() => setFaceIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputController;
