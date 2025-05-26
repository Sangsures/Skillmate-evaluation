
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import expenseReducer from './expenseSlice';


const loadExpenses = () => {
  try {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : undefined;
  } catch (e) {
    return undefined;
  }
};


export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    expenses: expenseReducer
  },
  preloadedState: {
    expenses: loadExpenses() || []
  }
});

store.subscribe(() => {
  try {
    const currentExpenses = store.getState().expenses;
    localStorage.setItem('expenses', JSON.stringify(currentExpenses));
  } catch (e) {
    console.error("Failed to save expenses:", e);
  }
});

export default store;
