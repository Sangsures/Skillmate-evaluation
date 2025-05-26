import React, { useEffect, useState } from "react";
import SkillProgressChart from "./SkillProgressChart";
import TimeSpentChart from "./TimeSpentChart";

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
      <h3 className="text-lg font-semibold text-orange-950 mb-4">Quick Links</h3>
      <ul className="text-sm text-orange-900 space-y-2">
        <li><a href="#" className="hover:underline">Add New Skill</a></li>
        <li><a href="#" className="hover:underline">View All Courses</a></li>
        <li><a href="#" className="hover:underline">Edit Profile</a></li>
      </ul>
    </div>
  );
}

function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md min-h-[14rem]">
      <h3 className="text-lg font-semibold text-orange-950 mb-4">Recent Activity</h3>
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
      <h3 className="text-lg font-semibold text-orange-950 mb-4">Upcoming Tasks</h3>
      <ul className="text-sm text-gray-700 list-disc pl-4 space-y-2">
        <li>Finish 2 more lessons in UI Design</li>
        <li>Start backend integration</li>
        <li>Practice React Testing</li>
      </ul>
    </div>
  );
}

export default function DashboardHome() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.firstName) {
      setFirstName(user.firstName);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-orange-950">
          Welcome back, {firstName || "User"}!
        </h1>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-orange-950">
          {firstName ? firstName.charAt(0).toUpperCase() : "U"}
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
  );
}
