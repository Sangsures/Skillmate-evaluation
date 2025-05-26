import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Tasks from "./Tasks";
import '@testing-library/jest-dom';

jest.mock("../redux/taskSlice", () => ({
  addTask: (title) => ({ type: "ADD_TASK", payload: title }),
  deleteTask: (id) => ({ type: "DELETE_TASK", payload: id }),
  toggleStatus: (id) => ({ type: "TOGGLE_STATUS", payload: id }),
  setFilter: (filter) => ({ type: "SET_FILTER", payload: filter }),
  setPage: (page) => ({ type: "SET_PAGE", payload: page }),
  editTask: ({ id, title }) => ({ type: "EDIT_TASK", payload: { id, title } }),
}));

const mockStore = configureStore([]);

function renderWithStore(storeState) {
  const store = mockStore(storeState);
  store.dispatch = jest.fn();
  return {
    ...render(
      <Provider store={store}>
        <Tasks />
      </Provider>
    ),
    store,
  };
}

describe("Tasks Component", () => {
  const initialState = {
    tasks: {
      tasks: [
        { id: 1, title: "Task 1", status: "pending" },
        { id: 2, title: "Task 2", status: "completed" },
      ],
      filter: "all",
      currentPage: 1,
      tasksPerPage: 5,
    },
  };

  it("renders the tasks component with initial state", () => {
    const { store } = renderWithStore(initialState);

    console.log("Rendering Tasks component with initial state:");
    console.log(initialState);
    console.log("Dispatching actions:");
    console.log(store.dispatch);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("adds a task", () => {
    const { store } = renderWithStore(initialState);
    fireEvent.change(screen.getByPlaceholderText("Enter task"), {
      target: { value: "New Task" },
    });
    fireEvent.click(screen.getByText("Add"));
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "ADD_TASK",
      payload: "New Task",
    });
  });

  it("deletes a task", () => {
    const { store } = renderWithStore(initialState);
    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "DELETE_TASK",
      payload: 1,
    });
  });
});
