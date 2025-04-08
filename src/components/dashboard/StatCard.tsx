import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  count: string | number;
  label: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ count, label, icon }) => {
  return (
    <div className="bg-[white] shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative p-6 rounded-xl">
      <div className="text-[28px] font-semibold text-gray-900">{count}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
      <div className="absolute text-indigo-600 right-6 top-6">{icon}</div>
      <div className="text-sm text-indigo-600 cursor-pointer mt-4">
        View Details
      </div>
    </div>
  );
};

export default StatCard;
