import React from 'react';

/**
 * Custom SVG Radar Chart for lifestyle profile comparison
 * Plots 6 key dimensions on a 0-100 scale.
 */
export default function CompatibilityRadar({ data = [], userName = "You", matchName = "Match", size = 300 }) {
  if (!data || data.length === 0) return null;

  const center = size / 2;
  const radius = (size / 2) - 45;
  const numAxes = data.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Helper to compute (x, y) coordinates for an axis at given value (0 to 100)
  const getCoordinates = (value, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Concentric polygon levels (20, 40, 60, 80, 100)
  const levels = [20, 40, 60, 80, 100];

  // User polygon points
  const userPoints = data.map((d, i) => {
    const { x, y } = getCoordinates(d.user ?? 50, i);
    return `${x},${y}`;
  }).join(' ');

  // Match candidate polygon points
  const matchPoints = data.map((d, i) => {
    const { x, y } = getCoordinates(d.match ?? 50, i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background concentric polygons */}
        {levels.map((lvl) => {
          const points = data.map((_, i) => {
            const { x, y } = getCoordinates(lvl, i);
            return `${x},${y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={points}
              fill={lvl === 100 ? "#f8fafc" : "none"}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={lvl === 100 ? "none" : "3,3"}
            />
          );
        })}

        {/* Spoke lines from center to each vertex */}
        {data.map((d, i) => {
          const { x, y } = getCoordinates(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Current User Polygon (Indigo) */}
        <polygon
          points={userPoints}
          fill="rgba(99, 102, 241, 0.25)"
          stroke="#4f46e5"
          strokeWidth="2.5"
        />

        {/* Match Candidate Polygon (Emerald) */}
        <polygon
          points={matchPoints}
          fill="rgba(16, 185, 129, 0.25)"
          stroke="#059669"
          strokeWidth="2.5"
        />

        {/* Vertex Dots */}
        {data.map((d, i) => {
          const uCoord = getCoordinates(d.user ?? 50, i);
          const mCoord = getCoordinates(d.match ?? 50, i);
          return (
            <g key={i}>
              <circle cx={uCoord.x} cy={uCoord.y} r="3.5" fill="#4f46e5" />
              <circle cx={mCoord.x} cy={mCoord.y} r="3.5" fill="#059669" />
            </g>
          );
        })}

        {/* Spoke Axis Labels */}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 24;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <g key={i} className="text-center">
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-semibold fill-slate-700"
              >
                {d.subject}
              </text>
              <text
                x={lx}
                y={ly + 12}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-medium fill-indigo-600"
              >
                {d.score}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block"></span>
          <span>{userName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
          <span>{matchName}</span>
        </div>
      </div>
    </div>
  );
}
