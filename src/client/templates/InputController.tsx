import React, { useCallback, useMemo, useState } from 'react';
import Cube from '../components/Cube';
import { Progress } from 'reactstrap';
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

  const isComplete = useCallback(
    (side: keyof CubeState) => cubeState[side].filter((el) => el !== '').length === 9,
    [cubeState]
  );

  const numberDone = useMemo(
    () => Object.keys(cubeState).filter((face) => isComplete(face as keyof CubeState)).length,
    [cubeState, isComplete]
  );

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

  const renderProgressTrackers = useMemo(
    () =>
      Object.entries(colorCombinations).map(([face, { centerColor }], index) => (
        <div className={'mb-2 InputController__progressTracker'}>
          <ProgressTracker
            color={centerColor}
            isDone={isComplete(face as keyof CubeState)}
            onClick={() => setFaceIndex(index)}
          />
        </div>
      )),
    [isComplete]
  );

  return (
    <>
      <div className="row w-100">
        <div className="col-md-10 col-sm-12 card px-0 ml-auto mr-auto">
          <Cube
            {...colorCombinations[currentFace]}
            onChange={handleChange}
            onNextFace={handleNextFace}
            cubeState={cubeState}
          />
          <Progress
            className={'col-8 ml-auto mr-auto px-0'}
            animated
            value={numberDone}
            min={0}
            max={6}
          />
          <div className="d-flex flex-wrap my-4 justify-content-around">
            {renderProgressTrackers}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputController;
