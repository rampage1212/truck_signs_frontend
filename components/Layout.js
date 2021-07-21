import NextNavbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <NextNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
