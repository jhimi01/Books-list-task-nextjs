import { ChartBar, Code, Database, Lock, PhoneCall } from "lucide-react";

export default function Services() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        We provide high-quality web solutions with a focus on performance, security, and user experience.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          icon={<Code className="text-blue-500 text-4xl" />} 
          title="Web Development" 
          description="Build modern, scalable web applications using Next.js, Tailwind CSS, and advanced technologies."
        />
        <ServiceCard 
          icon={<Lock className="text-red-500 text-4xl" />} 
          title="Authentication" 
          description="Secure user authentication with session management, JWT tokens, and protected routes."
        />
        <ServiceCard 
          icon={<ChartBar className="text-green-500 text-4xl" />} 
          title="Dashboard & Analytics" 
          description="Custom dashboards with real-time data visualization and user-friendly analytics."
        />
        <ServiceCard 
          icon={<PhoneCall className="text-purple-500 text-4xl" />} 
          title="Responsive UI Design" 
          description="Fully optimized user interfaces for seamless experiences across devices."
        />
        <ServiceCard 
          icon={<Database className="text-yellow-500 text-4xl" />} 
          title="Database Management" 
          description="Reliable and scalable PostgreSQL database solutions for efficient data handling."
        />
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-md p-6 text-center hover:shadow-lg transition">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
