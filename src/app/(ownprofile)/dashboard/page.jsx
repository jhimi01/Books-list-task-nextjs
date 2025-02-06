import { auth } from "@/auth";
import LogOut from "@/components/auth/LogOut";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = await auth();

  if (!session) redirect("/login")

    console.log(session)

  return (
    <div>
       <h1>{session?.user?.name}</h1>
       <Image src={session?.user?.image} alt={session?.user?.name} width={200} height={200} />


       <LogOut />
    </div>
  )
}
