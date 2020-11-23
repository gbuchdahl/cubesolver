import React, { useMemo, useState } from 'react';
import { charToColorHex } from '../core/colors';

export interface CubeFaceProps {
  type: 'top' | 'right' | 'center';
  centerColor: string;
  onChange: ((newValue: string[]) => unknown) | null;
}

const CubeFace: React.FunctionComponent<CubeFaceProps> = (props) => {
  // Function which takes in a color and returns a sticker of that color
  const { centerColor, onChange, type } = props;

  const [value, setValue] = useState(['', '', '', '', centerColor, '', '', '', '']);

  const colorHexes = useMemo(() => value.map((c) => charToColorHex[c]), [value]);

  const renderSticker = (color: string, index: number) => {
    const letter = value[index] === 'E' ? '' : value[index];

    const changeLetter = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLetter = event.target.value.toLocaleUpperCase();
      if (!Object.keys(charToColorHex).includes(newLetter)) {
        return;
      }
      let newValue = [...value];
      newValue[index] = newLetter;
      setValue(newValue);
      if (!onChange) return;
      onChange(newValue);
    };

    const fontColor = ['R', 'B'].includes(letter) ? 'white' : 'black';

    return (
      <div
        key={`sticker${index}`}
        className="rounded sticker border-dark ml-1 mb-1 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: color }}
      >
        {!!onChange && (
          <input
            name={`square${index}`}
            className="CubeFace__input"
            style={{ color: fontColor }}
            value={letter}
            maxLength={1}
            disabled={index === 4}
            onChange={(e) => changeLetter(e)}
          />
        )}
      </div>
    );
  };

  let outerClasses = 'cubeHolder';

  if (type === 'top') {
    outerClasses += ' cubeFaceTop';
  }

  if (type === 'right') {
    outerClasses += ' cubeFaceRight';
  }

  if (type === 'center') {
    outerClasses += ' cubeFaceCenter';
  }

  return (
    <div className={outerClasses}>
      <div className="d-flex flex-wrap flex-shrink-1">
        {colorHexes.map((color, index) => renderSticker(color, index))}
      </div>
    </div>
  );
};

export default CubeFace;
