import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: "all",
    currentPage: 1,
    tasksPerPage: 5,
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        title: action.payload,
        status: "pending",
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status =
          task.status === "pending" ? "completed" : "pending";
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    editTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
      }
    },
  },
});

export const { addTask, deleteTask, toggleStatus, setFilter, setPage, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
