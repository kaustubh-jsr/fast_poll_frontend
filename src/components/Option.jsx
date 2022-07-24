import React from "react";

const Option = ({ title, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect()}
      className={`w-full flex items-center bg-white rounded-md px-6 py-4 border-4 transition-all duration-300 hover:shadow-xl
            ${!isSelected && "border-gray-100 shadow-lg"}
            ${
              isSelected &&
              "border-green-500 !border-opacity-50 !shadow-md -mr-2"
            }
          `}
    >
      <span
        className={`
              block h-5 w-5 rounded-full
              ${isSelected && "bg-green-400"}
              ${!isSelected && "border-2"}
            `}
      />
      <h1 className="ml-9 text-lg sm:text-xl font-bold">{title}</h1>
    </button>
  );
};

export { Option };
