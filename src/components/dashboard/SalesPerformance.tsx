import React from "react";

const SalesPerformance: React.FC = () => {
  return (
    <div className="bg-[white] shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6 rounded-xl">
      <div className="text-base font-semibold text-gray-900 mb-1">
        Sales Performance
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Track your sales performance over the last 6 months.
      </div>
      <div className="h-40 flex items-center justify-center text-gray-400">
        Sales chart will be displayed here
      </div>
    </div>
  );
};

export default SalesPerformance;
