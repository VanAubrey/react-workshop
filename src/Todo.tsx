import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Todo() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingInput, setEditingInput] = useState("");
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, taskInput]);
      setCheckedTasks([...checkedTasks, false]);
      setTaskInput("");
      document.getElementById("taskInput")?.focus();
    }
  };

  const editTask = (index: number, newTask: string) => {
    const updatedTasks = tasks.map((task, i) => (i === index ? newTask : task));
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingInput("");
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCheckedTasks = checkedTasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCheckedTasks(updatedCheckedTasks);
  };

  const toggleCheck = (index: number) => {
    const updatedCheckedTasks = checkedTasks.map((checked, i) =>
      i === index ? !checked : checked
    );
    setCheckedTasks(updatedCheckedTasks);
  };

  return (
    <>
      <div className="bg-gradient-to-tr from-violet-700 via-blue-900 to-blue-500 p-6 rounded-lg shadow-2xl w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="flex mb-4">
          <input
            id="taskInput"
            type="text"
            className="flex-grow p-2 border rounded-l-md focus:outline-none bg-white text-black"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-l-none rounded-r-md hover:bg-green-600 ml-2"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul id="taskList" className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`bg-white text-black p-2 rounded shadow flex justify-between items-center ${
                checkedTasks[index] ? "line-through" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={checkedTasks[index]}
                onChange={() => toggleCheck(index)}
                className="w-3 h-3 ml-2"
              />
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    className="flex-grow p-2 border rounded-md focus:outline-none bg-white text-black"
                    value={editingInput}
                    onChange={(e) => setEditingInput(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-2"
                    onClick={() => editTask(index, editingInput)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow text-left ml-2">{task}</span>
                  <div>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 ml-2"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditingInput(task);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
                      onClick={() => deleteTask(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
