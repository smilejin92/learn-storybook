import { Meta, Story } from '@storybook/react';
import Task, { TaskProps } from './Task';

export default {
  component: Task,
  title: 'Task',
} as Meta;

const Template: Story<TaskProps> = args => <Task {...args} />;

const defaultTask = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX' as const,
};

export const Default = Template.bind({});
Default.args = {
  task: defaultTask,
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...defaultTask,
    state: 'TASK_PINNED',
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...defaultTask,
    state: 'TASK_ARCHIVED',
  },
};
