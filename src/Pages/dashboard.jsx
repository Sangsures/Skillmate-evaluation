import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-200 to-white">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between min-h-screen rounded-r-xl">
  <div>
    <div className="flex items-center gap-3 mb-10">
      <img
        src="https://www.svgrepo.com/show/385312/learning-head-book-education.svg"
        alt="Logo"
        className="h-8 w-8"
      />
      <h2 className="text-2xl font-bold text-orange-950">SkillMate</h2>
    </div>

  
    <nav className="flex flex-col gap-3 text-sm text-gray-700">
      <SidebarLink to="/tasks" label="Task Manager" icon="📝" />
      <SidebarLink to="/resources" label="Learning Resources" icon="📚" />
      <SidebarLink to="/expenses" label="Expense Tracker" icon="💰" />
      <SidebarLink to="/profile" label="Profile " icon="👤" />
    </nav>
  </div>

  <button
    onClick={handleLogout}
    className="bg-orange-950 text-white py-2 rounded mt-8 hover:bg-stone-600 transition-colors"
  >
    Logout
  </button>
</aside>


      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-950">
            Welcome back, Rohit!
          </h1>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            R
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Skills Completed" />
          <DashboardCard title="Content Progressed" />
          <DashboardCard title="Courses to be learned" />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-2 py-3 rounded-lg text-base font-semibold transition-all
         ${isActive
           ? "bg-orange-950 text-orange-950 border-l-4 border-orange-950 shadow"
           : "hover:bg-orange-50 hover:text-orange-950 hover:border-l-4 hover:border-orange-400 border-l-4 border-transparent"}`
      }
    >
      <span className="text-xl">{icon}</span>
      {label}
    </NavLink>
  );
}

function DashboardCard({ title }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:bg-grey-650 transition">
      <h3 className="text-lg font-semibold text-orange-950">{title}</h3>
      <p className="text-gray-500 mt-2 text-sm">Progress: 40%</p>
    </div>
  );
}

function PlaceholderCard({ title }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-40 flex items-center justify-center text-gray-400">
      charts to be filled
    </div>
  );
}
