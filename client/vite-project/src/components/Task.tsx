import { TaskProps } from "../types/taskProps";
import { FaPencilAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState, useEffect } from "react";

function Task({
  title,
  id,
  deleteTask,
  onChangeHandler,
  updateTask,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskInputValue, setTaskInputValue] = useState(title);

  useEffect(() => {
    setTaskInputValue(title);
  }, [title]);

  return (
    <>
      {!isEditing ? (
        <div className="bg-white p-4 w-60 mb-4 flex items-center justify-between">
          <h2 className="text-black">{title}</h2>
          <div className="flex gap-3">
            <div
              onClick={() => setIsEditing((prevState) => !prevState)}
              className="border-2 p-1 cursor-pointer hover:border-amber-600 hover:text-amber-600"
            >
              <FaPencilAlt />
            </div>
            <div
              onClick={() => deleteTask(id)}
              className="border-2 p-1 cursor-pointer hover:border-red-600 hover:text-red-600"
            >
              <RxCross1 />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 w-80 mb-4 flex items-center justify-between gap-2">
          <input
            className="border-2  border-b-black w-32"
            type="text"
            onChange={(e) => onChangeHandler(e, setTaskInputValue)}
            value={taskInputValue}
          />
          <button
            onClick={() => {
              updateTask(id, taskInputValue),
                setIsEditing((prevState) => !prevState);
            }}
            className="border-2 border-black p-1"
          >
            Update
          </button>
          <button
            onClick={() => setIsEditing((prevState) => !prevState)}
            className="border-2 border-black p-1"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default Task;
