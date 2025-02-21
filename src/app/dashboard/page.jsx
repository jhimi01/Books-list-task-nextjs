import { BarChart, Users, FileText, Settings } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/add-book"><button className="bg-primary-800 text-white px-4 py-2  shadow-md hover:bg-blue-600 transition">
          Add Books
        </button></Link>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users size={28} />} label="Total Users" value="12,345" />
        <StatCard icon={<FileText size={28} />} label="Total Posts" value="567" />
        <StatCard icon={<BarChart size={28} />} label="Revenue" value="$23,400" />
      </section>

      {/* Recent Activities */}
      <section className="bg-white p-5  shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          <ActivityItem text="John Doe created a new post." time="2 hours ago" />
          <ActivityItem text="Admin updated user roles." time="5 hours ago" />
          <ActivityItem text="New user signed up." time="1 day ago" />
        </ul>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction label="Manage Users" icon={<Users size={24} />} />
        <QuickAction label="View Reports" icon={<FileText size={24} />} />
        <QuickAction label="Analytics" icon={<BarChart size={24} />} />
        <QuickAction label="Settings" icon={<Settings size={24} />} />
      </section>
    </div>
  );
}

// Stats Card Component
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white p-5  shadow-md flex items-center gap-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

// Activity Item Component
function ActivityItem({ text, time }) {
  return (
    <li className="flex justify-between text-gray-700">
      <span>{text}</span>
      <span className="text-gray-400 text-sm">{time}</span>
    </li>
  );
}

// Quick Action Button
function QuickAction({ label, icon }) {
  return (
    <button className="bg-white p-4 shadow-md flex flex-col items-center gap-2 hover:bg-gray-100 transition">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
