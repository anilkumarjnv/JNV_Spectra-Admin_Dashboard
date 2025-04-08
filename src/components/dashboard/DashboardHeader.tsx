import React from "react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-6">
      <div className="text-2xl font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-500 mt-1">{description}</div>
    </div>
  );
};

export default DashboardHeader;
