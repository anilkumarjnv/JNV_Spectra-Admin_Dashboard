import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  CalendarClock,
  Calendar,
  FileInvoice,
  FileText,
  Settings,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer transition-[background-color] duration-[0.2s] p-3 rounded-lg hover:bg-gray-700">
      {icon}
      <div>{label}</div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-[280px] bg-gray-800 flex flex-col text-[white] p-6 max-sm:hidden">
      <div className="flex flex-col gap-3 mb-6 pb-6 border-b-[rgba(255,255,255,0.1)] border-b border-solid">
        <div className="flex items-center gap-3">
          <Calendar className="text-2xl text-white" />
          <div className="text-xl font-semibold">Media Hub</div>
        </div>
        <div className="text-xs text-[rgba(255,255,255,0.7)]">
          Admin Dashboard
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarItem
          icon={<ShoppingCart size={20} />}
          label="Services & Rentals"
        />
        <SidebarItem
          icon={<CalendarClock size={20} />}
          label="Event Planning"
        />
        <SidebarItem icon={<Calendar size={20} />} label="Events Hosted" />
        <SidebarItem
          icon={<FileInvoice size={20} />}
          label="Orders & Invoices"
        />
        <SidebarItem icon={<FileText size={20} />} label="Section Content" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
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
