import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense } from "../redux/expenseSlice";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Expenses = () => {
  const [budget, setBudget] = useState("");
  const [form, setForm] = useState({ amount: "", category: "", description: "", date: "" });
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const defaultCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Healthcare",
    "Education",
    "Entertainment",
    "Bills",
    "Savings",
    "Travel",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(form));
    setForm({ amount: "", category: "", description: "", date: "" });
  };

  const filteredExpenses = filter
    ? expenses.filter((expense) => expense.category === filter)
    : expenses;

  const totalExpense = filteredExpenses.reduce(
    (acc, expense) => acc + parseFloat(expense.amount || 0),
    0
  );

  const remainingBudget = budget - totalExpense;

  const categoryBreakdown = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryBreakdown),
    datasets: [
      {
        data: Object.values(categoryBreakdown),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Tracker</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full h-auto lg:w-1/3 bg-white p-4 shadow rounded-md">
          <label htmlFor="budget" className="block text-lg font-semibold mb-2">
            Monthly Budget (₹):
          </label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            className="p-2 border rounded w-full mb-4"
          />
          <div className="text-lg font-bold">
            Total Expense: <span className="text-red-500">₹{totalExpense.toFixed(2)}</span>
          </div>
          <div className="text-lg font-bold mt-2">
            Remaining Budget:{" "}
            <span className={remainingBudget >= 0 ? "text-green-500" : "text-red-500"}>
              ₹{remainingBudget.toFixed(2)}
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/3 bg-white p-4 shadow rounded-md"
        >
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="amount"
              placeholder="Amount (₹)"
              type="number"
              value={form.amount}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
              className="p-2 border rounded"
            >
              <option value="" disabled>
                Select Category
              </option>
              {defaultCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
              required
              className="p-2 border rounded col-span-full"
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleInputChange}
              required
              className="p-2 border rounded col-span-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full lg:w-2/3 bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-bold mb-4">Expenses</h2>
          <div className="mb-4">
            <label htmlFor="filter" className="block font-semibold mb-2">
              Filter by Category:
            </label>
            <select
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="p-2 border rounded w-full"
            >
              <option value="">All</option>
              {defaultCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredExpenses.map((expense, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">
                    ₹{expense.amount} - {expense.category}
                  </p>
                  <p className="text-sm text-gray-600">{expense.description}</p>
                  <p className="text-sm text-gray-400">{expense.date}</p>
                </div>
                <button
                  onClick={() => dispatch(deleteExpense(index))}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        
        <div className="w-full lg:w-1/3 bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-bold mb-4">Expense Breakdown</h2>
          <div className="max-w-xs mx-auto">
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
