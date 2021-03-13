import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#00B74A", "#F93154", "#FFA900"];

const ProficiencyChart = ({ proficiency }) => {
  let cnvProficiency = Object.keys(proficiency).map((key) => ({
    name: key,
    value: Number(proficiency[key]),
    color: key === "correct" ? COLORS[0] : key === "wrong" ? COLORS[1] : COLORS[2]
  }));
  return (
    <ResponsiveContainer width={200} height={200}>
      <PieChart>
        <Pie
          data={cnvProficiency}
          dataKey="value"
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          paddingAngle={5}
        >
          {cnvProficiency.map(({ color }, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export { ProficiencyChart };
