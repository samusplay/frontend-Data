import React from 'react';

interface RecommendationProps {
  recommendations?: Array<{
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    zone?: string;
  }>;
  label?: string;
}

export default function Recomendaciones({
  recommendations = [],
  label = "Recomendaciones"
}: RecommendationProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-800/50 bg-red-900/20';
      case 'medium':
        return 'border-yellow-800/50 bg-yellow-900/20';
      default:
        return 'border-green-800/50 bg-green-900/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="text-red-400">🔴</span>;
      case 'medium':
        return <span className="text-yellow-400">🟡</span>;
      default:
        return <span className="text-green-400">🟢</span>;
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-zinc-400 text-sm font-medium">{label}</h3>
      <div className="mt-4 space-y-3">
        {recommendations.length === 0 ? (
          <p className="text-zinc-500 text-center py-4">No hay recomendaciones disponibles</p>
        ) : (
          recommendations.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
            >
              <div className="flex items-start gap-3">
                {getPriorityIcon(rec.priority)}
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                  <p className="text-zinc-400 text-xs mt-1">{rec.description}</p>
                  {rec.zone && (
                    <span className="inline-block mt-2 px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded">
                      {rec.zone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {recommendations.length > 3 && (
        <p className="text-xs text-zinc-500 mt-3 text-center">
          +{recommendations.length - 3} más recomendaciones
        </p>
      )}
    </div>
  );
}