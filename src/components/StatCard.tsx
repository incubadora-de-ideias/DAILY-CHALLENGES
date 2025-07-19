// src/components/StatCard.tsx
import React from "react";
import { IconType } from "react-icons"; //eitar qualquer ícone

type StatCardProps = {
  title: string;
  value: number;
  icon: IconType;
  color?: string; // Cor de fundo opcional (usaremos Tailwind)
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color = "bg-gray-200" }) => {
  return (
    <div className={`rounded-xl p-4 shadow-md ${color} text-white flex items-center gap-4`}>
      <div className="text-4xl">
        <Icon />
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};
