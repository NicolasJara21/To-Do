import { useState } from "react";
import { Task, Action } from "../reducers/taskReducer";

type Props = {
  state: Task[];
  dispatch: React.Dispatch<Action>;
};

export const TaskList = ({ state, dispatch }: Props) => {
  const [taskList, setTaskList] = useState<
    "todo" | "pendientes" | "completados"
  >("todo");

  const filterTask = state.filter((e) => {
    if (taskList === "completados") return e.completed;
    if (taskList === "pendientes") return !e.completed;
    return true;
  });

  return (
    <>
      <div className="bg-gray-900 w-full h-screen">
        <div className="bg-gray-700 w-full h-[40px] mt-2  text-white flex justify-center">
          <button
            onClick={() => setTaskList("todo")}
            className="hover:text-blue-500 pr-10"
          >
            All
          </button>
          <button
            onClick={() => setTaskList("pendientes")}
            className="hover:text-blue-500 pr-10"
          >    
          Earrings
          </button>
          <button
            onClick={() => setTaskList("completados")}
            className="hover:text-blue-500"
          >
            
          Completed
          </button>
        </div>

        {filterTask.map((data) => (
          <div
            key={data.id}
            className="pt-10 flex justify-center p-2 pb-10 bg-gray-800 border-1 border-t-blue-900 "
          >
            <div className="flex p-2">
              <p className="pr-2 text-white">Task Completed</p>
              <input
                onChange={() => dispatch({ type: "completed", id: data.id })}
                checked={data.completed}
                type="checkbox"
              />
            </div>
            <h1 className="bg-white  w-[900px] p-2">{data.text}</h1>
            <button
              onClick={() => dispatch({ type: "removedTask", id: data.id })}
              className="bg-red-700 text-white p-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
