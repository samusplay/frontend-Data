import React from 'react';

interface ScoreProps {
  score?: number;
  label?: string;
}

export default function Score({ score, label = "Score" }: ScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/30 border-green-800/50';
    if (score >= 60) return 'bg-yellow-900/30 border-yellow-800/50';
    return 'bg-red-900/30 border-red-800/50';
  };

  if (score === undefined || score === null) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-zinc-400 text-sm font-medium">{label}</h3>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-bold text-zinc-500">N/A</span>
        </div>
        <p className="text-xs text-zinc-500 mt-3">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl p-6 shadow-lg ${getScoreBgColor(score)}`}>
      <h3 className="text-zinc-400 text-sm font-medium">{label}</h3>
      <div className="flex items-center gap-3 mt-3">
        <span className={`text-xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <p className="text-xs text-zinc-500 mt-3">
        {score >= 80 ? 'Excelente rendimiento' :
         score >= 60 ? 'Buen rendimiento' :
         'Requiere atención'}
      </p>
    </div>
  );
}