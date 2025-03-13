import { useState, useEffect } from 'react';
import './App.css';
import React from 'react';

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" });

 
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setAllTodo(savedTodos);
    }
  }, []);

  const submitHandler = () => {
    if (singleTodo.title && singleTodo.desc) {
      setAllTodo((prev) => {
        const updatedTodos = [...prev, singleTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setSingleTodo({ title: "", desc: "" }); 
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = allTodo.filter((_, i) => i !== index);
    setAllTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-400">Todo App</h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Title"
            value={singleTodo.title}
            onChange={(e) =>
              setSingleTodo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Description"
            value={singleTodo.desc}
            onChange={(e) =>
              setSingleTodo((prev) => ({ ...prev, desc: e.target.value }))
            }
          />
        </div>

        <button
          onClick={submitHandler}
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Todo
        </button>

        {/* Todo List */}
        <div className="mt-6">
          {allTodo.length === 0 ? (
            <p className="text-center text-gray-400">No todos yet!</p>
          ) : (
            allTodo.map((data, index) => (
              <div
                key={index}
                className="bg-gray-700 p-4 rounded-md shadow-md mb-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">{index + 1}. {data.title}</h2>
                  <p className="text-gray-400">{data.desc}</p>
                </div>
                <button
                  onClick={() => deleteTodo(index)}
                  className="ml-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
