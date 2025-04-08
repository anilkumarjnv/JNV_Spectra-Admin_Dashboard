import React from "react";

interface DashboardTabsProps {
  tabs: string[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ tabs }) => {
  return (
    <div className="flex gap-6 mb-8 pb-4 border-b border-solid">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className="text-sm text-gray-500 cursor-pointer -mb-4 pb-4 hover:text-gray-700"
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default DashboardTabs;
