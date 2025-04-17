export type TaskProps = {
  id: number;
  title: string;
  deleteTask: (task: TaskProps) => void;
};
