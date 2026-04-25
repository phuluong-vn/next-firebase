import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOption)
    if(session?.user)
    {
        redirect("/admin/dashboard")
    }
    return <>{children}</>
}