type TodoItemProps = {
  taskName: string;
  isComplete: boolean;
  onChangeStatus: () => void;
  onDeleteTask: () => void;
};

export default function TodoItem({ taskName, isComplete, onChangeStatus, onDeleteTask }: TodoItemProps) {
  return (
    <>
      <div>
        <p>{taskName}</p>
        <p>{isComplete ? "done" : "not done"}</p>

        <button
          onClick={() => {
            onChangeStatus();
          }}
        >
          change status
        </button>

        <button
          onClick={() => {
            onDeleteTask();
          }}
        >
          delete
        </button>
      </div>
    </>
  );
}
