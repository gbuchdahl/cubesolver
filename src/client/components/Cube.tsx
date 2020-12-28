import React, { createRef, useCallback, useEffect, useState } from 'react';
import CubeFace from './CubeFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { charToColorHex, charToColorName } from '../core/colors';
import classNames from 'classnames';

export interface CubeProps {
  topColor: string;
  rightColor: string;
  centerColor: string;
  onChange: (value: string[]) => unknown;
  onNextFace: () => unknown;
}

const Cube = (props: CubeProps) => {
  const { topColor, rightColor, centerColor, onChange, onNextFace } = props;
  const [isFull, setIsFull] = useState(false);

  const topColorHex = topColor !== 'W' ? charToColorHex[topColor] : '#A9A9A9';
  const rightColorHex = rightColor !== 'W' ? charToColorHex[rightColor] : '#A9A9A9';
  const centerColorHex = centerColor !== 'W' ? charToColorHex[centerColor] : '#A9A9A9';

  const buttonRef = createRef<HTMLButtonElement>();

  // Highlight the button if it ever fills up
  useEffect(() => {
    if (isFull && buttonRef.current) (buttonRef.current as any).focus();
  }, [isFull, buttonRef]);

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
    <p className="card-header text-muted mb-2 w-100 text-center">
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
  );

  return (
    <div className="card align-items-center">
      {renderInstructions()}
      <div className="d-flex flex-column align-items-center card-body">
        <FontAwesomeIcon
          size={'3x'}
          className="mb-2 mr-5"
          icon={faChevronCircleUp}
          color={topColorHex}
        />
        <div className="d-flex align-items-center">
          <CubeFace centerColor={centerColor} onChange={handleChange} />
          <FontAwesomeIcon
            size={'3x'}
            className="ml-2"
            icon={faChevronCircleRight}
            color={rightColorHex}
          />
        </div>
        <button
          onClick={onNextFace}
          ref={buttonRef}
          disabled={!isFull}
          type="button"
          className={classNames('btn', 'mr-5', 'mt-2', {
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
