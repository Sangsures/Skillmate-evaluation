import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../redux/expenseSlice";
import Expenses from "./Expenses";


jest.mock("react-chartjs-2", () => ({
  Pie: () => <div data-testid="pie-chart" />,
}));

const renderWithStore = (ui, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: { expenses: expenseReducer },
    preloadedState,
  });
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Expenses Component", () => {
  test("renders Expense Tracker title", () => {
    renderWithStore(<Expenses />);
    expect(screen.getByText(/Expense Tracker/i)).toBeInTheDocument();
  });

  test("allows user to input and budget", () => {
    renderWithStore(<Expenses />);
    const budgetInput = screen.getByLabelText(/Monthly Budget/i);
    fireEvent.change(budgetInput, { target: { value: "10000" } });
    expect(budgetInput.value).toBe("10000");
  });

  test("adds a new expense and displays it", () => {
    renderWithStore(<Expenses />);
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), { target: { value: "500" } });
    fireEvent.change(screen.getByRole("combobox", { name: "" }), { target: { value: "Food" } });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: "Lunch" } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2025-05-26" } });

    fireEvent.click(screen.getByRole("button", { name: /Add Expense/i }));

    expect(screen.getByText(/₹500 - Food/i)).toBeInTheDocument();
    expect(screen.getByText(/Lunch/i)).toBeInTheDocument();
    expect(screen.getByText(/2025-05-26/i)).toBeInTheDocument();
  });

  test("deletes an expense", () => {
    const preloadedState = {
      expenses: [
        { amount: "300", category: "Transport", description: "Bus fare", date: "2025-05-26" },
      ],
    };
    renderWithStore(<Expenses />, { preloadedState });
    expect(screen.getByText(/₹300 - Transport/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Delete/i));
    expect(screen.queryByText(/₹300 - Transport/i)).not.toBeInTheDocument();
  });
});
