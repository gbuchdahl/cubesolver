import React, { createRef, useCallback, useEffect, useState } from 'react';
import CubeFace from './CubeFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { charToColorName, getFaceForColor, getTextColor } from '../core/colors';
import classNames from 'classnames';
import { CubeState } from '../templates/InputController';
import { Button, Tooltip, UncontrolledTooltip } from 'reactstrap';

export interface CubeProps {
  topColor: string;
  rightColor: string;
  centerColor: string;
  onChange: (value: string[]) => unknown;
  onNextFace: () => unknown;
  onPreviousFace: (() => unknown) | null;
  cubeState: CubeState;
}

const Cube = (props: CubeProps) => {
  const {
    topColor,
    rightColor,
    centerColor,
    onChange,
    onNextFace,
    onPreviousFace,
    cubeState,
  } = props;
  // 1 = Show instructions tooltip 1
  // 2 = Show how to enter colors
  // 3 = When cube side is full, show progress tooltip
  const [tooltip, setTooltip] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('shownRubixTutorial') === null) {
      setTimeout(() => setTooltip(1), 1000);
      localStorage.setItem('shownRubixTutorial', '1');
    }
  }, []);

  const [isFull, setIsFull] = useState(false);

  const topColorHex = getTextColor(topColor);
  const rightColorHex = getTextColor(rightColor);
  const centerColorHex = getTextColor(centerColor);

  const buttonRef = createRef<HTMLButtonElement>();

  // Highlight the button if it ever fills up
  useEffect(() => {
    if (isFull && buttonRef.current) (buttonRef.current as any).focus();
  }, [isFull, buttonRef]);

  const handleNextFace = useCallback(() => {
    (buttonRef.current as any).blur();
    setIsFull(false);
    onNextFace();
  }, [buttonRef, onNextFace]);

  const handleChange = useCallback(
    (value: string[]) => {
      if (value.filter((s) => s !== '').length === 9) {
        setIsFull(true);
      } else {
        setIsFull(false);
      }
      onChange(value);
      if (tooltip === 2) {
        setTooltip(3);
      }
    },
    [tooltip, onChange]
  );

  const renderInstructions = () => (
    <>
      <Tooltip
        target={'orientationInstructions'}
        isOpen={tooltip === 1}
        placement={'bottom'}
        innerClassName={'bigTooltip'}
      >
        <div className={'d-flex flex-row'}>
          <h4 className={'mt-2'}>Line up your cube according to the instructions. </h4>
          <Button onClick={() => setTooltip(2)}>
            <FontAwesomeIcon icon={faTimes} color={'white'} />
          </Button>
        </div>
      </Tooltip>
      <Tooltip
        target={'sticker0'}
        isOpen={tooltip === 2}
        placement={'bottom'}
        innerClassName={'bigTooltip'}
      >
        <div className={'d-flex flex-row'}>
          <h5 className={'mt-2'}>
            Type in the first letter of the color. Press delete to go back.
          </h5>
          <Button onClick={() => setTooltip(3)}>
            <FontAwesomeIcon icon={faTimes} color={'white'} />
          </Button>
        </div>
      </Tooltip>
      <p
        id="orientationInstructions"
        className="card-header mb-2 w-100 text-center Cube__instructions"
      >
        Point the{' '}
        <span className="font-weight-bold" style={{ color: topColorHex }}>
          {charToColorName[topColor]}
        </span>{' '}
        center <strong>up</strong>, the{' '}
        <span className="font-weight-bold" style={{ color: centerColorHex }}>
          {charToColorName[centerColor]}
        </span>{' '}
        center <strong>toward you</strong>, and the{' '}
        <span className="font-weight-bold" style={{ color: rightColorHex }}>
          {charToColorName[rightColor]}
        </span>{' '}
        center <strong>toward the right</strong>.
      </p>
    </>
  );

  return (
    <div className="align-items-center px-0">
      {renderInstructions()}
      <div className="d-flex flex-column align-items-center card-body position-relative">
        <UncontrolledTooltip target={'rightButton'}>Go to the next face</UncontrolledTooltip>
        <button
          id={'rightButton'}
          onClick={handleNextFace}
          ref={buttonRef}
          disabled={!isFull}
          type="button"
          className="btn btn-secondary Cube__next mt-2"
        >
          <FontAwesomeIcon
            size={'3x'}
            className="mb-2"
            icon={faChevronCircleRight}
            color={'white'}
          />
        </button>

        {!!onPreviousFace && (
          <>
            <UncontrolledTooltip target={'leftButton'}>Go to the previous face</UncontrolledTooltip>
            <button
              id="leftButton"
              onClick={onPreviousFace}
              ref={buttonRef}
              type="button"
              className="btn btn-secondary Cube__previous"
            >
              <FontAwesomeIcon
                size={'3x'}
                className="mb-2"
                icon={faChevronCircleLeft}
                color={'white'}
              />
            </button>
          </>
        )}

        <FontAwesomeIcon
          size={'3x'}
          className="mb-2"
          icon={faChevronCircleUp}
          color={topColorHex}
        />
        <div className="d-flex align-items-center ml-5">
          <CubeFace
            centerColor={centerColor}
            onChange={handleChange}
            initialState={cubeState[getFaceForColor(centerColor) as keyof CubeState]}
          />
          <FontAwesomeIcon
            size={'3x'}
            className="ml-2"
            icon={faChevronCircleRight}
            color={rightColorHex}
          />
        </div>
        <UncontrolledTooltip target={'nextFaceButton'}>Go to the next face</UncontrolledTooltip>
        <button
          id={'nextFaceButton'}
          onClick={handleNextFace}
          ref={buttonRef}
          disabled={!isFull}
          type="button"
          className={classNames('btn', 'mt-2', {
            'btn-success': isFull,
            'btn-secondary': !isFull,
          })}
        >
          Next face
        </button>
      </div>
    </div>
  );
};

export default Cube;
