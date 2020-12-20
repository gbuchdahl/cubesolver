import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import CubeFace from './CubeFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { charToColorHex, charToColorName } from '../core/colors';
import classNames from 'classnames';

export interface CubeProps {
  topColor: string;
  rightColor: string;
  centerColor: string;
  onChange: (value: string[], centerColor: string) => unknown;
  onNextFace: () => unknown;
}

const Cube = (props: CubeProps) => {
  const { topColor, rightColor, centerColor, onChange, onNextFace } = props;
  const [isFull, setIsFull] = useState(false);

  const topColorHex = topColor !== 'W' ? charToColorHex[topColor] : '#A9A9A9';
  const rightColorHex = rightColor !== 'W' ? charToColorHex[rightColor] : '#A9A9A9';

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
      onChange(value, centerColor);
    },
    [centerColor, onChange]
  );

  const renderInstructions = () => (
    <h6 className="text-muted mb-2">
      Align the{' '}
      <span className="font-weight-bold" style={{ color: topColorHex }}>
        {charToColorName[topColor]}
      </span>{' '}
      center facing <strong>up</strong>, and the{' '}
      <span className="font-weight-bold" style={{ color: rightColorHex }}>
        {charToColorName[rightColor]}
      </span>{' '}
      center facing <strong>right</strong>.
    </h6>
  );

  return (
    <div className="card p-2 d-flex col-lg-6 col-12 align-items-center">
      {renderInstructions()}
      <div className="d-flex flex-column align-items-center">
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
