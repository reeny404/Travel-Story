import React from "react";

type TransportOptionProps = {
  label: string;
  icon: React.FC<{ className?: string }>;
  onClick: (label: string) => void;
  isSelected: boolean;
};

const TransportOption: React.FC<TransportOptionProps> = ({
  label,
  icon: Icon,
  onClick,
  isSelected,
}) => {
  return (
    <li className="text-center">
      <button
        className={`w-14 h-14 leading-14 rounded-lg flex items-center justify-center mx-auto ${
          isSelected ? "bg-olive-300 text-white" : "bg-gray-100"
        }`}
        type="button"
        onClick={() => onClick(label)}
      >
        <Icon className="w-5 h-5" />
      </button>
      <p className="text-sm">{label}</p>
    </li>
  );
};

export default TransportOption;
