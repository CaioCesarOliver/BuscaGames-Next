import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AccessDenied from "@/components/AccessDenied";

export default async function PrivateLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <AccessDenied />;
  }

  return <div className="private-layout">{children}</div>;
}
