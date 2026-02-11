<<<<<<< HEAD
<<<<<<< HEAD
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import React, { type JSX } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
=======
import { Outlet } from "react-router-dom";
=======
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import React, { type JSX } from "react";

<<<<<<< HEAD
const MainLayout = (): JSX.Element => {
>>>>>>> d720bde (Pushing the project to the repo)
=======
const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-layout-content">
<<<<<<< HEAD
<<<<<<< HEAD
        {children}
=======
        <Outlet />
>>>>>>> d720bde (Pushing the project to the repo)
=======
        {children}
>>>>>>> 9cd112e (Implement core application architecture with routing, authentication, UI components, and SCSS styling.)
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
