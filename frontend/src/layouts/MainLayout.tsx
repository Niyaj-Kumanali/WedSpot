import React, { type JSX } from "react";
import NavBar from "@/components/Layout/Navbar/NavBar";
import Footer from "@/components/Layout/Footer/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-layout-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
