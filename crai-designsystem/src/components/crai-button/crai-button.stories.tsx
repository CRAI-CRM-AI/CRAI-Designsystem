import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta: Meta = {
  title: 'Components/Button',
  component: 'crai-button',
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    slot: {
      control: { type: 'text' },
    },
  },
  render: args => <crai-button {...args}>{args.slot}</crai-button>,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    slot: 'Button',
  },
};

export const Submit: Story = {
  args: {
    type: 'submit',
    slot: 'Submit',
  },
};
