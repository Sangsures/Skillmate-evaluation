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
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Expense Tracker</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-md col-span-1">
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

        <div className="bg-white shadow-lg p-6 rounded-md col-span-2">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleInputChange}
              required
              className="p-2 border rounded w-full"
            />
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleInputChange}
              required
              className="p-2 border rounded w-full"
            />
            <button
              type="submit"
              className="bg-orange-950 text-white py-2 px-4 rounded w-full hover:bg-stone-600 transition-colors"
            >
              Add Expense
            </button>
          </form>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-md col-span-2">
          <h2 className="text-xl font-bold mb-4">Expenses</h2>
          <label htmlFor="filter" className="block font-semibold mb-2">
            Filter by Category:
          </label>
          <select
            id="filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="p-2 border rounded mb-4 w-full"
          >
            <option value="">All</option>
            {defaultCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="space-y-4">
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

        <div className="bg-white shadow-lg p-6 rounded-md">
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
