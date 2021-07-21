export interface TaskData {
  id: string;
  title: string;
  state: 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';
}

export interface TaskProps {
  task: TaskData;
}

export default function Task(props: TaskProps) {
  const {
    task: { id, title, state },
  } = props;

  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" />
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
        />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}
