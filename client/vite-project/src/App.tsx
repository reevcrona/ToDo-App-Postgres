import { useState, useEffect } from "react";
import Task from "./components/Task";
import axios from "axios";
import { TasksDataType } from "./types/tasksDataType";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskData, setTaskData] = useState<TasksDataType[]>([]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateHandler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    stateHandler(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { task: taskInput };
    console.log("This is the form data", formData);
    try {
      const response = await axios.post("http://localhost:3000/add", formData);
      console.log(response.data.tasks);
      setTaskData(response.data.tasks);
      setTaskInput("");
    } catch (error) {
      console.error("Failed adding new task", error);
    }
  };

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000");
    setTaskData(response.data.tasks);
  };

  const updateTask = async (taskId: number, taskText: string) => {
    const response = await axios.put("http://localhost:3000/update", {
      data: { taskId: taskId, taskText: taskText },
    });
    setTaskData(response.data.tasks);
  };

  const deleteTask = async (taskId: number) => {
    const response = await axios.delete("http://localhost:3000/delete", {
      data: { taskId: taskId },
    });
    setTaskData(response.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className=" w-full h-full flex items-center justify-center">
      <div className="border-black border-4 bg-transparent w-full max-w-[1000px] min-h-[650px]">
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="flex  items-center justify-center mt-4"
        >
          <label htmlFor="task-input"></label>
          <input
            type="text"
            id="task-input"
            name="task-input"
            placeholder="Add Task"
            value={taskInput}
            className="bg-white pl-1.5 py-1.5"
            onChange={(e) => onChangeHandler(e, setTaskInput)}
          />
          <button
            type="submit"
            className="text-white ml-2 border-2 border-white px-5 py-1 cursor-pointer"
          >
            Add
          </button>
        </form>
        <div className="flex justify-center flex-col items-center mt-5">
          {taskData.length > 0 &&
            taskData.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                id={task.id}
                deleteTask={deleteTask}
                onChangeHandler={onChangeHandler}
                updateTask={updateTask}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
export default App;
