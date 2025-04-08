
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  CalendarClock,
  Calendar,
  FileText,
  Settings,
  // Replace FileInvoice with ReceiptText which is available
  ReceiptText,
  Image,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, active }) => {
  return (
    <Link to={to}>
      <div className={`flex items-center gap-3 cursor-pointer transition-all duration-200 p-3 rounded-lg ${
        active ? "bg-indigo-800 text-white" : "text-white hover:bg-gray-700"
      }`}>
        {icon}
        <div>{label}</div>
        {active && <div className="h-full w-1 bg-white absolute right-0 rounded-l-lg"></div>}
      </div>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-[260px] bg-[#1a1f2c] flex flex-col text-[white] p-6 h-screen fixed left-0 top-0 max-sm:hidden">
      <div className="flex flex-col gap-3 mb-6 pb-6 border-b-[rgba(255,255,255,0.1)] border-b border-solid">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-indigo-700 h-8 w-8 flex items-center justify-center">
            <Image size={20} />
          </div>
          <div className="text-xl font-semibold">Media Hub</div>
        </div>
        <div className="text-xs text-[rgba(255,255,255,0.7)]">
          Admin Dashboard
        </div>
      </div>

      <div className="flex flex-col gap-2 grow relative">
        <SidebarItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          to="/"
          active={currentPath === "/" || currentPath === "/dashboard"} 
        />
        <SidebarItem 
          icon={<ShoppingCart size={20} />} 
          label="Services & Rentals" 
          to="/services"
          active={currentPath.includes("/services")}
        />
        <SidebarItem 
          icon={<CalendarClock size={20} />} 
          label="Event Planning" 
          to="/event-planning"
          active={currentPath.includes("/event-planning")}
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          label="Events Hosted" 
          to="/events-hosted"
          active={currentPath.includes("/events-hosted")}
        />
        <SidebarItem 
          icon={<ReceiptText size={20} />} 
          label="Orders & Invoices" 
          to="/orders"
          active={currentPath.includes("/orders")}
        />
        <SidebarItem 
          icon={<FileText size={20} />} 
          label="Section Content" 
          to="/content"
          active={currentPath.includes("/content")}
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          to="/settings"
          active={currentPath.includes("/settings")}
        />
      </div>

      <div className="flex items-center gap-3 pt-6 border-t-[rgba(255,255,255,0.1)] border-t border-solid">
        <div className="w-10 h-10 bg-indigo-600 font-semibold rounded-lg flex items-center justify-center">
          AD
        </div>
        <div>
          <div className="text-sm font-medium">Admin User</div>
          <div className="text-xs text-[rgba(255,255,255,0.7)]">
            admin@example.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
