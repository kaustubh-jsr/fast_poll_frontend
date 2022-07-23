import React from "react";

const OptionProgress = ({ title, votes, percentage }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-md text-gray-800">
      <div className="w-full flex mb-3">
        <span className="text-xl font-bold">{title}</span>
        <span className="ml-auto text-xl font-bold">{percentage}%</span>
      </div>
      <div className="w-full h-3 rounded-md bg-gray-200 mb-3 overflow-hidden">
        <div
          className="h-3 rounded-md bg-green-500 opacity-60 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-green-600">{votes} Votes</span>
    </div>
  );
};

export { OptionProgress };
