import React from "react";
import { useNavigate } from "react-router-dom";

function EmergencyButton({ tx, icon, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-[200px] px-4 py-4 rounded-md bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition duration-300 shadow-lg space-x-3"
      >
        {icon}
        <span>{tx}</span>
      </button>
    </div>
  );
}

export default EmergencyButton;
