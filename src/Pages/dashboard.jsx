import React, { useEffect } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { FaTasks, FaBook, FaMoneyBillWave, FaUser } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex w-screen h-screen max-h-screen overflow-hidden bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between h-full hidden md:flex">
        <div>
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 mb-6"
          >
            <img
              src="https://www.svgrepo.com/show/385312/learning-head-book-education.svg"
              alt="Logo"
              className="h-7 w-8"
            />
            <h2 className="text-2xl font-bold text-orange-950">SkillMate</h2>
          </NavLink>

          <nav className="flex flex-col gap-3 text-sm text-gray-700">
            <SidebarLink
              to="/dashboard/tasks"
              label="Task Manager"
              icon={<FaTasks className="text-black dark:text-gray" />}
            />
            <SidebarLink
              to="/dashboard/resources"
              label="Learning Resources"
              icon={<FaBook className="text-black dark:text-gray" />}
            />
            <SidebarLink
              to="/dashboard/expenses"
              label="Expense Tracker"
              icon={<FaMoneyBillWave className="text-black dark:text-gray" />}
            />
            <SidebarLink
              to="/dashboard/profile"
              label="Profile"
              icon={<FaUser className="text-black dark:text-gray" />}
            />
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-orange-950 text-white py-2 rounded mt-8 hover:bg-stone-600 transition-colors"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-all
         ${
           isActive
             ? "bg-orange-100 text-orange-950 border-l-4 border-orange-950 shadow"
             : "hover:bg-orange-50 hover:text-orange-950 hover:border-l-4 hover:border-orange-400 border-l-4 border-transparent"
         }`
      }
    >
      <span className="text-xl text-black dark:text-white">{icon}</span>
      {label}
    </NavLink>
  );
}
