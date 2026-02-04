<<<<<<< HEAD
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import React, { type JSX } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
=======
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import { type JSX } from "react";

const MainLayout = (): JSX.Element => {
>>>>>>> d720bde (Pushing the project to the repo)
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-layout-content">
<<<<<<< HEAD
        {children}
=======
        <Outlet />
>>>>>>> d720bde (Pushing the project to the repo)
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
