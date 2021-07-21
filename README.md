# learn-storybook

## Intro to Storybook

- UI component development tool for React, Vue, and Angular.
- help develop and design UI components outside your app in an isolated environment.

&nbsp;

### 1. Simple component

**Component-Driven Development (CDD)**

- build UIs from the “bottom up” starting with components and ending with screens
- help you scale the amount of complexity

&nbsp;

**Two basic levels of organization in Storybook**

- component
- component's child stories

&nbsp;

**Each story = a permutation of a component**

- Component
  - story
  - story
  - story

&nbsp;

**To tell Storybook about the component we are documenting, we create a `default` export that contains**

- component: the component itself
- title: storybook 앱에서 해당 컴포넌트를 어떻게 표시할지

```jsx
// Task.stories.js
import Task from './Task';

export default {
  component: Task,
  title: 'Task',
};
```

&nbsp;

**To define a story, export a function that returns a rendered element in a given state**

```jsx
// 1. Template 만들기 (여러 상태를 가진 컴포넌트의 스토리를 만들 경우)
const Template = args => <Task {...args} />;

// 2.1. Task 컴포넌트의 기본 UI
export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

// 2.2. Task 컴포넌트가 pinned 상태일 때
export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED',
  },
};

// 2.3. Task 컴포넌트가 archived 상태일 때
export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED',
  },
};
```

Arguments(`args`)는 컨트롤 애드온을 통해 컴포넌트를 실시간으로 수정 할 수 있도록 한다. `args` 의 값이 변경되면, 컴포넌트도 변경된다. 위 예제에서 사용된 `Default.args.task` 는 실제로 `Task` 컴포넌트에 전달되는 데이터를 기반으로 작성되어있다. 이를 통해 `Task` 컴포넌트의 기본 UI story(`state === 'TASK_INBOX'`)를 생성 할 수 있다.

&nbsp;

**Config - parameters**

```js
// .storybook/preview.js

import '../src/index.css'; // 각 story에 글로벌 스타일 적용

export const parameters = {
  // actions 파라미터는 스토리 컴포넌트에 콜백 함수(mocked callback)를 전달하여
  // 테스트 할 수 있도록 해준다.
  // 스토리 컴포넌트에 전달된 콜백 함수는 스토리북 UI actions 패널에서 확인 할 수 있다.
  actions: { argTypesRegex: '^on[A-Z].*' },
};
```

`preview.js` 파일에 선언된 `parameters` 객체는 스토리북의 기능과 애드온의 동작을 컨트롤하기 위해 사용된다.

&nbsp;

**prop 인터페이스 작성**

`propTypes`를 사용 할 수 있지만 TypeScript를 사용하여 인터페이스로 `Task` 컴포넌트의 인터페이스를 작성

```tsx
export interface TaskProps {
  task: {
    id: string;
    title: string;
    state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
  };
  onArchiveTask: (id: string) => void;
  onPinTask: (id: string) => void;
}

export default function Task(props: TaskProps) {
  // return ...
}
```

&nbsp;

**스냅샷 테스팅**

스냅샷 테스팅은 주어진 Input을 통해 완성된 output을 기록하여, 만약 미래에 해당 output이 변경될 경우 flagging 하는 것을 말한다. 새로운 디자인의 UI 버전을 확인하여 변경사항을 빠르게 확인 할 수 있다.

스토리북은 `storyshots` 애드온을 통해 스냅샷 테스팅을 지원한다.

```shell
npm i @storybook/addon-storyshots
```

```js
import initStoryshots from '@storybook/addon-storyshots';

initStoryshots();
```

만약 `Task`의 구현 사항이 변경되면, 해당 변경 사항을 확인하라고 prompt된다.

&nbsp;

### 2. Assemble a composite component

간단한 컴포넌트를 조합하여 합성 컴포넌트 만들기
