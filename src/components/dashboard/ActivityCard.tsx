import React from "react";

interface ActivityCardProps {
  title: string;
  description: string;
  items: string[];
  className?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  items,
  className = "",
}) => {
  return (
    <div
      className={`bg-[white] shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6 rounded-xl ${className}`}
    >
      <div className="text-base font-semibold text-gray-900 mb-1">{title}</div>
      <div className="text-sm text-gray-500 mb-4">{description}</div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="text-sm text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
