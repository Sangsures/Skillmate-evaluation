import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import expenseReducer from './expenseSlice';


export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    expenses: expenseReducer,
  },
});

export default store;
