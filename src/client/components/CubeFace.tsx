import classNames from 'classnames';
import React, { createRef, useEffect, useMemo, useState } from 'react';
import { charToColorHex } from '../core/colors';

export interface CubeFaceProps {
  centerColor: string;
  onChange: ((newValue: string[]) => unknown) | null;
}

const CubeFace: React.FunctionComponent<CubeFaceProps> = (props) => {
  const { centerColor, onChange } = props;

  const [value, setValue] = useState(['', '', '', '', centerColor, '', '', '', '']);

  // Reset the value every time we are looking at a different cube face
  useEffect(() => setValue(['', '', '', '', centerColor, '', '', '', '']), [centerColor]);

  const colorHexes = useMemo(() => value.map((c) => charToColorHex[c]), [value]);

  let refs: React.RefObject<HTMLInputElement>[] = [];
  for (let i = 0; i < 9; i++) {
    refs.push(createRef());
  }

  // Focus the first sticker on mount
  // eslint-disable-next-line
  useEffect(() => refs[0].current!.focus(), [centerColor]);

  // Function which takes in a color and returns a sticker of that color
  const renderSticker = (color: string, index: number) => {
    const letter = value[index] === 'E' ? '' : value[index];

    const handleKeyDown = (event: KeyboardEvent | any) => {
      if ((event.key === 'Backspace' || event.key === 'Delete') && index !== 0 && letter === '') {
        if (index === 5) {
          refs[3].current!.focus();
        } else {
          refs[index - 1].current!.focus();
        }
      }
    };

    const changeLetter = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLetter = event.target.value.toLocaleUpperCase();

      if (!Object.keys(charToColorHex).includes(newLetter)) {
        // Only change valid letters
        return;
      }

      // Update the value with the new letter
      let newValue = [...value];
      newValue[index] = newLetter;
      setValue(newValue);
      if (!onChange) return;
      onChange(newValue);

      // Focus the next letter
      if (index !== 8 && newLetter !== '') {
        if (index === 3) {
          refs[5].current!.focus();
        } else {
          refs[index + 1].current!.focus();
        }
      }
    };

    const fontColor = ['R', 'B'].includes(letter) ? 'white' : 'black';

    return (
      <div
        key={`sticker${index}`}
        className={classNames(
          'rounded sticker border-dark ml-1 mb-1 d-flex align-items-center justify-content-center'
        )}
        style={{ backgroundColor: color }}
      >
        {!!onChange && (
          <input
            ref={refs[index]}
            name={`square${index}`}
            className="CubeFace__input"
            style={{ color: fontColor }}
            value={letter}
            maxLength={1}
            disabled={index === 4}
            onChange={(e) => changeLetter(e)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    );
  };

  return (
    <div className="cubeHolder">
      <div className="d-flex flex-wrap flex-shrink-1">
        {colorHexes.map((color, index) => renderSticker(color, index))}
      </div>
    </div>
  );
};

export default CubeFace;
