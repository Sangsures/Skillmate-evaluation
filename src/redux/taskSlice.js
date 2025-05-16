import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filter: 'all',
  currentPage: 1,
  tasksPerPage: 5,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), title: action.payload, status: 'pending' });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.status = task.status === 'completed' ? 'pending' : 'completed';
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { addTask, deleteTask, toggleStatus, setFilter, setPage } = taskSlice.actions;
export default taskSlice.reducer;
