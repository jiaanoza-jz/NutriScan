import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  data: { name: string; value: number; color: string }[];
}

export const MacroChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 h-[300px] flex flex-col">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Macro Split</h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-around mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] font-bold text-gray-400 uppercase">{item.name}</span>
            <span className="text-sm font-bold text-gray-700">{item.value}g</span>
          </div>
        ))}
      </div>
    </div>
  );
};