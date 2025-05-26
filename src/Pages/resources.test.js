import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Resources from "./Resources";

const mockArticles = [
  {
    id: 1,
    title: "React Testing Tips",
    user: { name: "Alice" },
    url: "https://dev.to/article1",
  },
  {
    id: 2,
    title: "Python Tricks",
    user: { name: "Bob" },
    url: "https://dev.to/article2",
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockArticles),
    })
  );
});
afterEach(() => {
  global.fetch.mockRestore();
});

test("shows main heading ", async () => {
  render(<Resources />);
  expect(await screen.findByText(/Learning Resources/i)).toBeInTheDocument();
  ["programming", "javascript", "python", "react", "webdev"].forEach((tag) => {
    expect(screen.getByRole("button", { name: tag })).toBeInTheDocument();
  });
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

test("shows loading message while fetching articles", async () => {
  global.fetch = jest.fn(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ json: () => Promise.resolve([]) }), 500)
      )
  );
  render(<Resources />);
  expect(screen.getByText(/Loading articles/i)).toBeInTheDocument();
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

test("filters articles by search term", async () => {
  render(<Resources />);
  await screen.findByText(/React Testing Tips/i);
  fireEvent.change(screen.getByPlaceholderText(/Search articles/i), {
    target: { value: "python" },
  });
  expect(await screen.findByText(/Python Tricks/i)).toBeInTheDocument();
  expect(screen.queryByText(/React Testing Tips/i)).not.toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/Search articles/i), {
    target: { value: "alice" },
  });
  expect(await screen.findByText(/React Testing Tips/i)).toBeInTheDocument();
  expect(screen.queryByText(/Python Tricks/i)).not.toBeInTheDocument();
});
