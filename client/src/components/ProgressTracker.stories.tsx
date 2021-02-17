import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import ProgressTracker, { ProgressTrackerProps } from './ProgressTracker';

export default {
  title: 'Components/ProgressTracker',
  component: ProgressTracker,
} as Meta;

const Template: Story<ProgressTrackerProps> = (args) => <ProgressTracker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'G',
  isDone: false,
  onClick: () => {
    console.log('clicked');
  },
};
//
// export const Empty = Template.bind({});
// Empty.args = { value: emptyCube, onChange: handleChange };
