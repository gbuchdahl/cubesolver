import React from 'react';
import CubeFace from './CubeFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { charToColorHex, charToColorName } from '../core/colors';

export interface CubeProps {
  topColor: string;
  rightColor: string;
  centerColor: string;
  onChange: (value: string[]) => unknown;
}

const Cube = (props: CubeProps) => {
  const { topColor, rightColor, centerColor, onChange } = props;

  const topColorHex = topColor !== 'W' ? charToColorHex[topColor] : '#A9A9A9';
  const rightColorHex = rightColor !== 'W' ? charToColorHex[rightColor] : '#A9A9A9';

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <FontAwesomeIcon
          size={'3x'}
          className="mb-2 mr-5"
          icon={faChevronCircleUp}
          color={topColorHex}
        />
        <div className="d-flex align-items-center">
          <CubeFace
            type="center"
            centerColor={centerColor}
            onChange={(value) => console.log(value)}
          />
          <FontAwesomeIcon
            size={'3x'}
            className="ml-2"
            icon={faChevronCircleRight}
            color={rightColorHex}
          />
        </div>
      </div>
    </>
  );
};

export default Cube;
