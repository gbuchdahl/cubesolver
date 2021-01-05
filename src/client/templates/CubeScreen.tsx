import React, { useCallback, useRef, useState } from 'react';
import InputController from './InputController';
import { Fade, Button } from 'reactstrap';

interface CubeScreenProps {}

const CubeScreen = (props: CubeScreenProps) => {
  const [showCubeSolver, setShowCubeSolver] = useState(false);

  const fadeRef = useRef<HTMLDivElement>(null);

  const handleBegin = useCallback(() => {
    if (fadeRef.current) (fadeRef.current as any).scrollIntoView({ behavior: 'smooth' });
    setShowCubeSolver(true);
  }, []);

  return (
    <div className="CubeScreen__background">
      <div className="position-relative d-flex flex-column align-items-center w-100">
        <h1 className="CubeScreen__title">CubeSolver</h1>
        <div className="row text-center">
          <h2 className="CubeScreen__subtitle text-center">
            Never peel the stickers off your cube again.
          </h2>
        </div>
        <Button color="primary" className="my-4" onClick={handleBegin} disabled={showCubeSolver}>
          Get Started
        </Button>
      </div>

      <Fade in={showCubeSolver}>
        <div ref={fadeRef} className={'row ml-auto mr-auto col-10'}>
          <InputController />
        </div>
      </Fade>
    </div>
  );
};

export default CubeScreen;
