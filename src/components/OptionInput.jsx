import React from "react";
import { DeleteIcon } from "../assets/Icons";

const OptionInput = ({
  value,
  optionNumber,
  onChange,
  onDelete,
  showDelBtn,
  error,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-500 mb-1">
        Poll option {optionNumber}
      </h3>
      <div className="w-full flex gap-3 items-center">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Poll option ${optionNumber}`}
          className={`w-full p-2 text-lg outline-none focus:ring-2 ring-green-500 rounded-md border placeholder-gray-300
    ${error && !value.trim() && "ring-2 ring-red-300"}`}
        />
        {showDelBtn && (
          <DeleteIcon
            className="h-5 w-5 cursor-pointer text-red-500"
            onClick={() => onDelete()}
          />
        )}
      </div>
      {error && !value.trim() && (
        <span className="!mt-0 text-sm text-red-400 font-medium">
          This field can't be empty
        </span>
      )}
    </>
  );
};

export { OptionInput };
