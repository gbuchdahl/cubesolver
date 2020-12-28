export enum COLORS {
  BLUE = '#0045AD',
  GREEN = '#009B48',
  RED = '#B90000',
  WHITE = '#FFFFFF',
  YELLOW = '#FFD500',
  ORANGE = '#FF5900',
  EMPTY = '#A9A9A9',
}

export const charToColorHex: { [key: string]: string } = {
  B: COLORS.BLUE,
  G: COLORS.GREEN,
  R: COLORS.RED,
  W: COLORS.WHITE,
  Y: COLORS.YELLOW,
  O: COLORS.ORANGE,
  '': COLORS.EMPTY,
};

export const charToColorName: { [key: string]: string } = {
  B: 'Blue',
  G: 'Green',
  R: 'Red',
  W: 'White',
  Y: 'Yellow',
  O: 'Orange',
  '': 'Blank',
};

export const getTextColor = (color: string) => (color !== 'W' ? charToColorHex[color] : '#A9A9A9');

export interface ColorCombination {
  centerColor: string;
  rightColor: string;
  topColor: string;
}

// Front: Green
// Right: Orange
// Back: Blue
// Left: Red
// Down: White
// Top: Yellow
export const colorCombinations: { [color: string]: ColorCombination } = {
  F: { centerColor: 'G', rightColor: 'O', topColor: 'Y' },
  R: { centerColor: 'O', rightColor: 'B', topColor: 'Y' },
  B: { centerColor: 'B', rightColor: 'R', topColor: 'Y' },
  L: { centerColor: 'R', rightColor: 'G', topColor: 'Y' },
  D: { centerColor: 'W', rightColor: 'O', topColor: 'G' },
  T: { centerColor: 'Y', rightColor: 'O', topColor: 'B' },
};

export const getFaceForColor = (color: string) => {
  for (const [face, { centerColor }] of Object.entries(colorCombinations)) {
    if (centerColor === color) return face;
  }
};
