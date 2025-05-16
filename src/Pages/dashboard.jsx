import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import SkillProgressChart from "./SkillProgressChart";
import TimeSpentChart from "./TimeSpentChart";

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
          <div className="flex items-center gap-3 mb-6">
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
            <SidebarLink to="/profile" label="Profile" icon="👤" />
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
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-orange-950">
              Welcome back, Rohit!
            </h1>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              R
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <DashboardCard title="Skills Completed" progress={75} />
            <DashboardCard title="Content Progressed" progress={60} />
            <DashboardCard title="Courses to be learned" progress={35} />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md min-h-[18rem] flex items-center justify-center">
              <SkillProgressChart />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md min-h-[18rem] flex items-center justify-center">
              <TimeSpentChart />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            <QuickLinks />
            <RecentActivity />
            <UpcomingTasks />
          </section>
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
        `flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-all
         ${
           isActive
             ? "bg-orange-100 text-orange-950 border-l-4 border-orange-950 shadow"
             : "hover:bg-orange-50 hover:text-orange-950 hover:border-l-4 hover:border-orange-400 border-l-4 border-transparent"
         }`
      }
    >
      <span className="text-xl">{icon}</span>
      {label}
    </NavLink>
  );
}
function DashboardCard({ title, progress }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-orange-950 mb-2">{title}</h3>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-orange-500 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{progress}% Completed</p>
    </div>
  );
}

function QuickLinks() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[14rem]">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">
        Quick Links
      </h3>
      <ul className="text-sm text-orange-900 space-y-2">
        <li>
          <a href="#" className="hover:underline">
            Add New Skill
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            View All Courses
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Edit Profile
          </a>
        </li>
      </ul>
    </div>
  );
}


function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[14rem]">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">
        Recent Activity
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>Completed "React Basics" module</li>
        <li>Watched "Redux Intro" video</li>
        <li>Added new goal: Learn TypeScript</li>
      </ul>
    </div>
  );
}

function UpcomingTasks() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[14rem]">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">
        Upcoming Tasks
      </h3>
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-2">
        <li>Finish 2 more lessons in UI Design</li>
        <li>Start backend integration</li>
        <li>Practice React Testing</li>
      </ul>
    </div>
  );
}
