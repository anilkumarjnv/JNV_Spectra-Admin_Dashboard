
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f5f6fa] font-sans">
      <Sidebar />
      <div className="ml-[260px] w-full max-sm:ml-0">
        {children}
      </div>
    </div>
  );
};

export default Layout;
