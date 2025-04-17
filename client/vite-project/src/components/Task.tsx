import { TaskProps } from "../types/taskProps";
import { FaPencilAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

function Task({ title }: TaskProps) {
  return (
    <>
      <div className="bg-white p-4 w-60 mb-4 flex items-center justify-between">
        <h2 className="text-black">{title}</h2>
        <div className="flex gap-3">
          <div className="border-2 p-1 cursor-pointer hover:border-amber-600 hover:text-amber-600">
            <FaPencilAlt />
          </div>
          <div className="border-2 p-1 cursor-pointer hover:border-red-600 hover:text-red-600">
            <RxCross1 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
