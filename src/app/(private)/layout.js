import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import AccessDenied from "@/components/AccessDenied";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function PrivateLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <AccessDenied />;
  }

  return (
    <div className="private-layout">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
