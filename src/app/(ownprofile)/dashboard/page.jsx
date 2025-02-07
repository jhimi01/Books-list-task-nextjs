// 'use client'
import { auth } from "@/auth";
// import Cookies from "universal-cookie";
import Image from "next/image";
import { redirect } from "next/navigation";
// import useAuth from "@/hooks/useAuth";

export default async function Dashboard() {
  const session = await auth();
  // const { session, loading } = useAuth();

  if (!session) redirect("/login");

  return (
    <div className="flex items-center justify-center flex-col w-full text-center">
      <Image
        src={session?.user?.image}
        alt={session?.user?.name}
        width={1000}
        height={1000}
        className="w-40 h-40 rounded-full"
      />
      <h1 className="text-4xl mt-4 font-bold">{session?.user?.name}</h1>
      {/* Dashboard Content (Example) */}
      <main className="my-3">
        <h1 className="text-xl font-bold">Dashboard Content</h1>
        <p>Welcome to your dashboard. Select a menu option to view content.</p>
      </main>
    </div>
  );
}
