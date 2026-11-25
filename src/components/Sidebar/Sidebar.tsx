import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import {
  MenuIcon,
  BookIcon,
  ZapIcon,
  NavigationIcon,
  LayoutIcon,
} from "./Icons";

interface SidebarProps {
  onMenuSelect?: (menu: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to: string;
}

const Sidebar = ({ onMenuSelect }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems: MenuItem[] = [
    {
      id: "productDetails",
      label: "Product Details",
      icon: <BookIcon />,
      to: "/productDetails",
    },
    {
      id: "interactivity",
      label: "Interactivity & Hooks",
      icon: <ZapIcon />,
      to: "/hooks",
    },
    {
      id: "routing",
      label: "Routing",
      icon: <NavigationIcon />,
      to: "/routing",
    },
    {
      id: "structure",
      label: "Structure",
      icon: <LayoutIcon />,
      to: "/productExamples",
    },
    {
      id: "other",
      label: "Others",
      icon: <LayoutIcon />,
      to: "/other",
    },
  ];

  const handleMenuClick = (id: string) => {
    onMenuSelect?.(id);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {/* Header */}
      <div className="sidebarHeader">
        <div className="sidebarTitle">{isOpen && <h1>React Learning</h1>}</div>
        <button
          className="toggleBtn"
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="sidebarNav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => `menuItem ${isActive ? "active" : ""}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="menuIcon">{item.icon}</span>
            {isOpen && <span className="menuLabel">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="sidebarFooter">
          <p>TypeScript Essentials</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
