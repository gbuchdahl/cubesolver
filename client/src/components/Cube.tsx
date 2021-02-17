import React, { createRef, useCallback, useEffect, useState } from 'react';
import CubeFace from './CubeFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { charToColorName, getFaceForColor, getTextColor } from '../core/colors';
import classNames from 'classnames';
import { CubeState } from '../templates/InputController';

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
    },
    [onChange]
  );

  const renderInstructions = () => (
    <h5 className="card-header mb-2 w-100 text-center px-0">
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
    </h5>
  );

  return (
    <div className="align-items-center px-0">
      {renderInstructions()}
      <div className="d-flex flex-column align-items-center card-body position-relative">
        <button
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
          <button
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
        <button
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
