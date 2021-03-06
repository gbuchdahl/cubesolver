import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import Cube, { CubeProps } from './Cube';

export default {
  title: 'Components/Cube',
  component: Cube,
} as Meta;

const handleChange = () => null;

const handleNext = () => console.log('next');

const Template: Story<CubeProps> = (args) => <Cube {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  topColor: 'G',
  rightColor: 'B',
  centerColor: 'R',
  onChange: handleChange,
  onNextFace: handleNext,
};

export const withWhite = Template.bind({});
withWhite.args = { ...Primary.args, topColor: 'W' };
