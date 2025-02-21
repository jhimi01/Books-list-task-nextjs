
import { ChartBar, Database, LockIcon, PhoneCall, Shield, ShieldAlert } from "lucide-react";

export default function About() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">About Our Project</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Our modern Next.js web application is designed for a seamless user experience with secure authentication, 
        a personalized dashboard, and a fully responsive interface.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex items-start space-x-4">
          <LockIcon className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Secure Authentication</h2>
            <p className="text-gray-600">User login and signup with session management using cookies.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ChartBar className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Dynamic Dashboard</h2>
            <p className="text-gray-600">Personalized content management and user interaction.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <ShieldAlert className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Protected Routes</h2>
            <p className="text-gray-600">Secure access control based on authentication status.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <PhoneCall className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Responsive Design</h2>
            <p className="text-gray-600">Optimized for both desktop and mobile devices.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Database className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">PostgreSQL Database</h2>
            <p className="text-gray-600">Efficient data storage for performance and security.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <a
          href="https://drive.google.com/file/d/118S9OIIywAmuAvuLBbMC_kYtRWZR0Ocg/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary-800 text-white px-6 py-3 text-lg font-semibold hover:bg-primary-700 transition"
        >
          Watch Project Demo
        </a>
      </div>
    </section>
  );
}
