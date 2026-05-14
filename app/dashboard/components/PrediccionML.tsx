import React from 'react';

interface PredictionProps {
  predictions?: Array<{
    zone: string;
    confidence: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  label?: string;
}

export default function PrediccionML({ predictions = [], label = "Predicciones ML" }: PredictionProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-400">↗️</span>;
      case 'down':
        return <span className="text-red-400">↘️</span>;
      default:
        return <span className="text-yellow-400">→</span>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-zinc-400 text-sm font-medium">{label}</h3>
      <div className="mt-4 space-y-3">
        {predictions.length === 0 ? (
          <p className="text-zinc-500 text-center py-4">No hay predicciones disponibles</p>
        ) : (
          predictions.slice(0, 3).map((prediction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getTrendIcon(prediction.trend)}
                <span className="text-white font-medium">{prediction.zone}</span>
              </div>
              <span className={`font-bold ${getConfidenceColor(prediction.confidence)}`}>
                {prediction.confidence}%
              </span>
            </div>
          ))
        )}
      </div>
      {predictions.length > 3 && (
        <p className="text-xs text-zinc-500 mt-3 text-center">
          +{predictions.length - 3} más predicciones
        </p>
      )}
    </div>
  );
}