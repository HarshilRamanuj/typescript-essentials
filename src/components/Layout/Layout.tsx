import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";

interface LayoutProps {
  sidebar: ReactNode;
}

const Layout = ({ sidebar }: LayoutProps) => {
  return (
    <div className="layout-wrapper">
      <aside className="layout-sidebar">{sidebar}</aside>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
