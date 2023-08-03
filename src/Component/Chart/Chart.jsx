import React from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "09:00",
    male: 35,
    female: 10,
  },
  {
    name: "10:00",
    male: 30,
    female: 36,
  },
  {
    name: "11:00",
    male: 50,
    female: 20,
  },
  {
    name: "12:00",
    male: 80,
    female: 30,
  },
  {
    name: "01:00",
    male: 45,
    female: 24,
  },
  {
    name: "02:00",
    male: 50,
    female: 20,
  },
  {
    name: "03:00",
    male: 60,
    female: 10,
  },
];

const Chart = () => {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <AreaChart
          width={730}
          height={275}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colormale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorfemale" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="male"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colormale)"
          />
          <Area
            type="monotone"
            dataKey="female"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorfemale)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
