import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { type JSX } from "react";

const MainLayout = (): JSX.Element => {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
