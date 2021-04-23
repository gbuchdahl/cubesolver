import React from 'react';
import { charToColorName } from '../core/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';

export interface ProgressTrackerProps {
  color: string;
  isDone: boolean;
  onClick: () => unknown;
}

const ProgressTracker: React.FunctionComponent<ProgressTrackerProps> = (props) => {
  const { color, isDone, onClick } = props;
  const colorName = charToColorName[color];

  return (
    <>
      <UncontrolledTooltip
        target={`progressTracker__${colorName}`}
      >{`Go to the ${colorName.toLocaleLowerCase()} face`}</UncontrolledTooltip>
      <div
        id={`progressTracker__${colorName}`}
        className={classNames('ProgressTracker__card btn', {
          'btn-success': isDone,
          'btn-danger': !isDone,
        })}
        onClick={onClick}
      >
        <div>
          <h6 className="ProgressTracker__color">{colorName}</h6>
        </div>
        <div>
          {isDone ? (
            <FontAwesomeIcon icon={faCheckCircle} />
          ) : (
            <FontAwesomeIcon icon={faTimesCircle} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProgressTracker;
