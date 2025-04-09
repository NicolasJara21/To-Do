import { useEffect, useReducer, useState } from "react";
import { TaskList } from "./components/TaskList";
import { taskReducer } from "./reducers/taskReducer";

const init = () => {
  const storage = localStorage.getItem("tasks");
  return storage ? JSON.parse(storage) : [];
};



function App() {
  const [inputValue, setInputValue] = useState("");

  const [state, dispatch] = useReducer(taskReducer, [], init);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: "addTask", text: inputValue });
      setInputValue("");
    }
  };

  return (
    <>
      <div className="bg-gray-700 w-full h-[170px] font-mono">
        <div>
          {/* banner */}
          <div className="bg-gray-700 w-full h-[60px]">
            <div className="flex justify-center p-4">
              <img className="h-[27px] " src="/src/assets/logo.png"></img>
              <h1 className="pl-2 text-[20px] text-white">To-</h1>
              <h1 className="text-[20px] text-white">Do</h1>
            </div>
          </div>

          {/* input */}
          <div className=" flex justify-center mt-10">
            <form onClick={(e) => e.preventDefault()}>
              <input
                type="text"
                maxLength={100}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a task"
                className="bg-white p-2 w-[1000px] "
              ></input>
              <button
                onClick={clickButton}
                className="bg-blue-600 text-white p-2 "
              >
                Enter
              </button>
            </form>
          </div>
        </div>

        <TaskList state={state} dispatch={dispatch}></TaskList>
      </div>
    </>
  );
}

export default App;
