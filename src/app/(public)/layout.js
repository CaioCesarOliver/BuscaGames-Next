import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
