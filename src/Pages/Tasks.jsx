import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask, deleteTask, toggleStatus,
  setFilter, setPage
} from '../redux/taskSlice';

const Tasks = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const { tasks, filter, currentPage, tasksPerPage } = useSelector(state => state.tasks);

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTask(title));
      setTitle('');
    }
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true : task.status === filter
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <div className="flex gap-3 mb-4">
        <input
          className="border p-2 rounded flex-grow"
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'pending'].map(f => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
            className={`px-4 py-1 rounded border ${filter === f ? 'bg-blue-500 text-white' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      {currentTasks.map(task => (
        <div key={task.id} className="flex justify-between items-center border p-2 mb-2 rounded">
          <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
            {task.title}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleStatus(task.id))}
              className="bg-green-500 text-white px-2 rounded"
            >
              Completed
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="bg-red-500 hover:bg-red-600 text-white px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setPage(i + 1))}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
