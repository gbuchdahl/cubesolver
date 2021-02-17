import React, { useCallback, useRef, useState } from 'react';
import InputController, { CubeState } from './InputController';
import { Fade, Button, ButtonGroup } from 'reactstrap';
import { getSolve, solveToVerboseInstructions } from '../core/solve';

interface CubeScreenProps {}

const MainScreen = (props: CubeScreenProps) => {
  const [showCubeSolver, setShowCubeSolver] = useState(false);

  const [solve, setSolve] = useState<string | null>(null);
  const [verbose, setVerbose] = useState(true);

  const fadeRef = useRef<HTMLDivElement>(null);
  const solveRef = useRef<HTMLDivElement>(null);

  const handleBegin = useCallback(() => {
    if (fadeRef.current) (fadeRef.current as any).scrollIntoView({ behavior: 'smooth' });
    setShowCubeSolver(true);
  }, []);

  const handleSolve = useCallback(async (cube: CubeState) => {
    const solve = await getSolve(cube);
    setSolve(solve);
    if (solveRef.current) (solveRef.current as any).scrollIntoView({ behavior: 'smooth' });
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
        <Button
          size="lg"
          color="primary"
          className="my-4"
          onClick={handleBegin}
          disabled={showCubeSolver}
        >
          Solve your cube in two minutes
        </Button>
      </div>

      {showCubeSolver && (
        <Fade in={showCubeSolver}>
          <div ref={fadeRef} className={'row ml-auto mr-auto col-12 col-md-10'}>
            <InputController onSolve={handleSolve} />
          </div>
        </Fade>
      )}

      {!!solve && (
        <Fade in={!!solve}>
          <div ref={solveRef} className="d-flex flex-column flex-grow-1 align-items-center">
            <h1 className="text-white text-center mt-5 mb-3">Solve</h1>
            <ButtonGroup>
              <Button size="lg" active={!verbose} onClick={() => setVerbose(false)}>
                Concise
              </Button>
              <Button size="lg" active={verbose} onClick={() => setVerbose(true)}>
                Verbose
              </Button>
            </ButtonGroup>
            <h6 className="text-white mt-5">
              To start, orient the green face toward you, the yellow face up, and the white face
              down.
            </h6>
            {!verbose && <h3 className={'mt-3 mb-5 text-white'}>{solve}</h3>}
            {verbose && solve && (
              <div className="d-flex flex-column align-items-start">
                {solveToVerboseInstructions(solve).map((step) => {
                  const { originalDirection, direction, sentence } = step;
                  return (
                    <div className="d-flex flex-row">
                      <h4 className="text-white ml-2 mt-2">
                        <span className="text-danger">{originalDirection}:</span>
                        {` ${sentence} ${direction}`}
                      </h4>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Fade>
      )}

      <h6 className="CubeScreen__footer">
        {'Made with love by '}
        <a className="text-white ml-1" href="https://buchdahl.com">
          Gabriel Buchdahl
        </a>
      </h6>
    </div>
  );
};

export default MainScreen;
