import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// expects data: [{direction: 'N', speed: 4}, ...]
export default function WindPolarChart({ data }) {
  // adapt data to radar format: angle labels are directions
  return (
    <div style={{height:300}}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="direction" />
          <PolarRadiusAxis />
          <Radar name="Wind" dataKey="speed" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
