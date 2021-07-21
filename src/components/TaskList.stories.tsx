import TaskList, { TaskListProps } from './TaskList';
import { Meta, Story } from '@storybook/react';
import { Default as DefaultTask } from './Task.stories';
import { TaskData } from './Task';

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [
    Story => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<TaskListProps> = args => <TaskList {...args} />;

const defaultTasks = Array(6)
  .fill({})
  .map((_, idx) => ({
    ...(DefaultTask.args?.task as TaskData),
    id: String(idx + 1),
    title: `Task ${idx + 1}`,
  }));

export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: defaultTasks,
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...defaultTasks.slice(0, 5),
    { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
