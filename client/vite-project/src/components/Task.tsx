import { TaskProps } from "../types/taskProps";

function Task({ title }: TaskProps) {
  return (
    <>
      <div className="bg-white">
        <h2 className="text-black">{title}</h2>
      </div>
    </>
  );
}

export default Task;
