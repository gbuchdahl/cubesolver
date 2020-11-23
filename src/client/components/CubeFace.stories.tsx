import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import CubeFace, { CubeFaceProps } from './CubeFace';

export default {
  title: 'Components/CubeFace',
  component: CubeFace,
} as Meta;

const emptyCube = ['', '', '', '', '', '', '', '', ''];

let filled = 'RGBYWORGB'.split('');

const handleChange = (newValue: string[]) => {
  console.log(newValue);
};

const Template: Story<CubeFaceProps> = (args) => <CubeFace {...args} />;

export const Primary = Template.bind({});
Primary.args = { centerColor: 'Y', onChange: handleChange };
//
// export const Empty = Template.bind({});
// Empty.args = { value: emptyCube, onChange: handleChange };
