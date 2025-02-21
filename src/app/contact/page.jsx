import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Have a question or need support? Feel free to reach out to us.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Contact Info */}
        <div className="space-y-6">
          <ContactInfo icon={<Mail size={24} />} title="Email" content="support@example.com" />
          <ContactInfo icon={<Phone size={24} />} title="Phone" content="+123 456 7890" />
          <ContactInfo icon={<MapPin size={24} />} title="Address" content="123 Street, City, Country" />
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-md p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border rounded-lg "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full p-2 border rounded-lg "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="mt-1 block w-full p-2 border rounded-lg "
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-800 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition"
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

function ContactInfo({ icon, title, content }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
      <div className="p-3 bg-primary-700 text-primary-800 rounded-full">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
