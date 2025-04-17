export type TaskProps = {
  id: number;
  title: string;
  deleteTask: (taskId: number) => void;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  updateTask: (taskId: number, taskText: string) => void;
};
