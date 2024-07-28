import React from "react";

type TransportOptionProps = {
  label: string;
  onClick: (label: string) => void;
};

const TransportOption: React.FC<TransportOptionProps> = ({
  label,
  onClick,
}) => {
  return (
    <li className="text-center">
      <button
        className="w-14 h-14 leading-14 bg-gray-100 rounded-lg"
        onClick={() => onClick(label)}
      >
        {label}
      </button>
      <p className="text-sm">{label}</p>
    </li>
  );
};

export default TransportOption;
