import { MLScoringResponse, MLStrategy } from "../schemas/ml"

export const MOCK_PREDICTIONS: Record<MLStrategy, MLScoringResponse> = {
  gradient_boosting: {
    success: true,
    dataset_id: "demo-territorial",
    algorithm_used: "Gradient Boosting Regressor (Máxima Precisión)",
    execution_time_ms: 124.5,
    data: [
      {
        zone_code: "0",
        potential_score: 0.94,
        confidence: 0.91,
        interpretation: {
          label: "Antioquia (Z1)",
          business_summary: "Zona con óptimo crecimiento comercial e infraestructura consolidada. Altamente viable para expansión logística."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Ingresos promedio", impact: "Alto", weight: 0.88 },
            { factor: "Densidad poblacional", impact: "Alto", weight: 0.85 },
            { factor: "Conectividad vial", impact: "Medio", weight: 0.65 }
          ]
        }
      },
      {
        zone_code: "1",
        potential_score: 0.82,
        confidence: 0.88,
        interpretation: {
          label: "Atlántico (Z2)",
          business_summary: "Alto dinamismo portuario. Nivel de competencia medio-alto que se compensa por incentivos fiscales locales."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Actividad portuaria", impact: "Alto", weight: 0.90 },
            { factor: "Competencia comercial", impact: "Medio", weight: 0.70 },
            { factor: "Costos de arriendo", impact: "Bajo", weight: 0.40 }
          ]
        }
      },
      {
        zone_code: "4",
        potential_score: 0.96,
        confidence: 0.95,
        interpretation: {
          label: "Cundinamarca (Z5)",
          business_summary: "El centro neurálgico del país. Máximo puntaje por volumen de mercado interno y concentración de clientes corporativos."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Mercado corporativo", impact: "Crítico", weight: 0.98 },
            { factor: "PIB per cápita", impact: "Alto", weight: 0.92 },
            { factor: "Saturación comercial", impact: "Alto", weight: 0.78 }
          ]
        }
      },
      {
        zone_code: "8",
        potential_score: 0.88,
        confidence: 0.89,
        interpretation: {
          label: "Valle del Cauca (Z9)",
          business_summary: "Excelente balance entre costos operativos y conectividad hacia el pacífico colombiano. Crecimiento estable."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Conectividad marítima", impact: "Alto", weight: 0.85 },
            { factor: "Disponibilidad de bodegas", impact: "Medio", weight: 0.75 },
            { factor: "Seguridad territorial", impact: "Medio", weight: 0.60 }
          ]
        }
      },
      {
        zone_code: "2",
        potential_score: 0.58,
        confidence: 0.80,
        interpretation: {
          label: "Bolívar (Z3)",
          business_summary: "Mercado estacional dependiente del turismo. Viabilidad moderada enfocada a servicios minoristas."
        },
        color_code: "#f59e0b",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Estacionalidad turística", impact: "Alto", weight: 0.80 },
            { factor: "Ingresos estables", impact: "Bajo", weight: 0.45 },
            { factor: "Costos de energía", impact: "Alto", weight: 0.75 }
          ]
        }
      },
      {
        zone_code: "7",
        potential_score: 0.74,
        confidence: 0.84,
        interpretation: {
          label: "Santander (Z8)",
          business_summary: "Clúster industrial pujante. Nivel educativo promedio superior a la media nacional ideal para talento técnico."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "gradient_boosting",
          main_factors: [
            { factor: "Talento calificado", impact: "Alto", weight: 0.82 },
            { factor: "Costos operativos", impact: "Medio", weight: 0.55 },
            { factor: "Apoyo municipal", impact: "Medio", weight: 0.50 }
          ]
        }
      }
    ],
    recommendations: [
      { variable: "Ingresos promedio", impact: 0.88, recommendation: "Potenciar productos premium y estrategias de fidelización debido al alto poder adquisitivo.", type: "opportunity" },
      { variable: "Densidad poblacional", impact: 0.85, recommendation: "Incrementar campañas de captación y expansión comercial debido al alto flujo potencial de clientes.", type: "opportunity" },
      { variable: "Saturación comercial", impact: 0.78, recommendation: "Desarrollar una estrategia de precios agresiva y fortalecer diferenciadores de marca frente a la alta saturación.", type: "risk" }
    ],
    model_metrics: {
      n_zones: 6,
      r2_score: 0.92,
      feature_importances: {
        "Ingresos promedio": 0.35,
        "Densidad poblacional": 0.28,
        "Actividad portuaria": 0.20,
        "Talento calificado": 0.17
      }
    }
  },
  random_forest: {
    success: true,
    dataset_id: "demo-territorial",
    algorithm_used: "Random Forest Classifier (Consenso Robusto)",
    execution_time_ms: 198.2,
    data: [
      {
        zone_code: "0",
        potential_score: 0.91,
        confidence: 0.94,
        interpretation: {
          label: "Antioquia (Z1)",
          business_summary: "Consenso general de estabilidad territorial a mediano plazo. Los factores de riesgo se ven minimizados."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "random_forest",
          main_factors: [
            { factor: "Historial de ventas", impact: "Alto", weight: 0.90 },
            { factor: "Densidad de pymes", impact: "Medio", weight: 0.70 },
            { factor: "Estabilidad política", impact: "Medio", weight: 0.60 }
          ]
        }
      },
      {
        zone_code: "4",
        potential_score: 0.93,
        confidence: 0.96,
        interpretation: {
          label: "Cundinamarca (Z5)",
          business_summary: "Mercado diversificado con alta resiliencia ante crisis económicas. Ideal para inversiones de largo alcance."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "random_forest",
          main_factors: [
            { factor: "Diversificación económica", impact: "Crítico", weight: 0.95 },
            { factor: "Consumo de hogares", impact: "Alto", weight: 0.89 },
            { factor: "Infraestructura vial", impact: "Alto", weight: 0.80 }
          ]
        }
      },
      {
        zone_code: "8",
        potential_score: 0.85,
        confidence: 0.91,
        interpretation: {
          label: "Valle del Cauca (Z9)",
          business_summary: "Establecido como el segundo polo logístico. Nivel de variabilidad muy bajo entre predicciones."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "random_forest",
          main_factors: [
            { factor: "Crecimiento industrial", impact: "Alto", weight: 0.84 },
            { factor: "Cercanía al puerto Buenaventura", impact: "Alto", weight: 0.88 },
            { factor: "Costos tributarios", impact: "Medio", weight: 0.55 }
          ]
        }
      },
      {
        zone_code: "5",
        potential_score: 0.52,
        confidence: 0.82,
        interpretation: {
          label: "Huila (Z6)",
          business_summary: "Región con potencial agroindustrial pero con limitantes de infraestructura logística pesada."
        },
        color_code: "#f59e0b",
        model_evidence: {
          algorithm: "random_forest",
          main_factors: [
            { factor: "Producción agrícola", impact: "Alto", weight: 0.85 },
            { factor: "Vías secundarias", impact: "Bajo", weight: 0.35 },
            { factor: "Acceso a crédito", impact: "Medio", weight: 0.50 }
          ]
        }
      },
      {
        zone_code: "6",
        potential_score: 0.72,
        confidence: 0.87,
        interpretation: {
          label: "Risaralda (Z7)",
          business_summary: "Eje cafetero dinámico. Atractivo por calidad de vida e infraestructura urbana moderna en crecimiento."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "random_forest",
          main_factors: [
            { factor: "Calidad de vida", impact: "Alto", weight: 0.80 },
            { factor: "Costo de vida", impact: "Medio", weight: 0.65 },
            { factor: "Mercado residencial", impact: "Medio", weight: 0.55 }
          ]
        }
      }
    ],
    recommendations: [
      { variable: "Diversificación económica", impact: 0.95, recommendation: "Aprovechar la diversificación local para lanzar líneas de productos complementarias.", type: "opportunity" },
      { variable: "Consumo de hogares", impact: 0.89, recommendation: "Aumentar inventario de consumo masivo para capturar el gasto de los hogares activos.", type: "opportunity" },
      { variable: "Costos tributarios", impact: 0.55, recommendation: "Optimizar la estructura fiscal a través de incentivos de zonas francas o regímenes especiales.", type: "risk" }
    ],
    model_metrics: {
      n_zones: 5,
      r2_score: 0.89,
      feature_importances: {
        "Diversificación económica": 0.40,
        "Cercanía al puerto Buenaventura": 0.30,
        "Historial de ventas": 0.20,
        "Calidad de vida": 0.10
      }
    }
  },
  knn: {
    success: true,
    dataset_id: "demo-territorial",
    algorithm_used: "K-Nearest Neighbors (Zonas Gemelas)",
    execution_time_ms: 45.1,
    data: [
      {
        zone_code: "0",
        potential_score: 0.89,
        confidence: 0.85,
        interpretation: {
          label: "Antioquia (Z1)",
          business_summary: "Similitud matemática muy estrecha con clústeres comerciales exitosos en Bogotá y Santiago."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "knn",
          main_factors: [
            { factor: "Perfil de consumidores", impact: "Alto", weight: 0.85 },
            { factor: "Tasa de bancarización", impact: "Alto", weight: 0.82 },
            { factor: "Canales digitales", impact: "Medio", weight: 0.60 }
          ]
        }
      },
      {
        zone_code: "3",
        potential_score: 0.62,
        confidence: 0.78,
        interpretation: {
          label: "Caldas (Z4)",
          business_summary: "Agrupada con territorios de nivel medio. Fuerte enfoque en servicios de soporte y BPO."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "knn",
          main_factors: [
            { factor: "Densidad de universidades", impact: "Alto", weight: 0.90 },
            { factor: "Infraestructura de red", impact: "Medio", weight: 0.70 },
            { factor: "Salarios promedio", impact: "Bajo", weight: 0.40 }
          ]
        }
      },
      {
        zone_code: "6",
        potential_score: 0.68,
        confidence: 0.80,
        interpretation: {
          label: "Risaralda (Z7)",
          business_summary: "Zona gemela de Caldas, comparte similitud en capital humano e infraestructura urbana compacta."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "knn",
          main_factors: [
            { factor: "Capital humano calificado", impact: "Alto", weight: 0.88 },
            { factor: "Tamaño territorial", impact: "Bajo", weight: 0.30 },
            { factor: "Crecimiento del PIB local", impact: "Medio", weight: 0.65 }
          ]
        }
      },
      {
        zone_code: "1",
        potential_score: 0.79,
        confidence: 0.83,
        interpretation: {
          label: "Atlántico (Z2)",
          business_summary: "Comparte comportamiento industrial con Zonas Francas del norte de Sudamérica. Atractivo logístico."
        },
        color_code: "#3b82f6",
        model_evidence: {
          algorithm: "knn",
          main_factors: [
            { factor: "Instalaciones portuarias", impact: "Alto", weight: 0.89 },
            { factor: "Acceso marítimo directo", impact: "Crítico", weight: 0.92 },
            { factor: "Costos de servicios", impact: "Alto", weight: 0.70 }
          ]
        }
      }
    ],
    recommendations: [
      { variable: "Acceso marítimo directo", impact: 0.92, recommendation: "Establecer un nodo de consolidación logística portuaria para importaciones/exportaciones.", type: "opportunity" },
      { variable: "Densidad de universidades", impact: 0.90, recommendation: "Crear convenios de pasantías y semilleros de talento para reducir costos de contratación.", type: "opportunity" },
      { variable: "Costos de servicios", impact: 0.70, recommendation: "Implementar auditorías de eficiencia energética para mitigar el alto costo operativo de servicios.", type: "risk" }
    ],
    model_metrics: {
      n_zones: 4,
      r2_score: 0.84,
      feature_importances: {
        "Acceso marítimo directo": 0.45,
        "Densidad de universidades": 0.25,
        "Capital humano calificado": 0.15,
        "Perfil de consumidores": 0.15
      }
    }
  },
  linear: {
    success: true,
    dataset_id: "demo-territorial",
    algorithm_used: "Multiple Linear Regressor (Modelo Transparente)",
    execution_time_ms: 12.0,
    data: [
      {
        zone_code: "0",
        potential_score: 0.87,
        confidence: 0.99,
        interpretation: {
          label: "Antioquia (Z1)",
          business_summary: "Predicción directa basada puramente en el peso positivo de la Densidad Poblacional y el PIB."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "linear",
          main_factors: [
            { factor: "Peso Densidad (+3.2)", impact: "Positivo", weight: 0.95 },
            { factor: "Peso PIB Local (+1.8)", impact: "Positivo", weight: 0.80 },
            { factor: "Peso Impuestos (-0.5)", impact: "Negativo", weight: 0.30 }
          ]
        }
      },
      {
        zone_code: "4",
        potential_score: 0.95,
        confidence: 0.99,
        interpretation: {
          label: "Cundinamarca (Z5)",
          business_summary: "Máximo potencial debido a que tiene los valores crudos más altos en todas las variables independientes positivas."
        },
        color_code: "#10b981",
        model_evidence: {
          algorithm: "linear",
          main_factors: [
            { factor: "Peso Consumo Interno (+4.1)", impact: "Positivo", weight: 0.99 },
            { factor: "Peso PIB Local (+1.8)", impact: "Positivo", weight: 0.85 },
            { factor: "Intersepto del Modelo", impact: "Base", weight: 0.50 }
          ]
        }
      },
      {
        zone_code: "3",
        potential_score: 0.51,
        confidence: 0.99,
        interpretation: {
          label: "Caldas (Z4)",
          business_summary: "Efecto lineal moderado. Penalizado ligeramente por el costo de transporte vial terrestre de montaña."
        },
        color_code: "#f59e0b",
        model_evidence: {
          algorithm: "linear",
          main_factors: [
            { factor: "Peso Distancia Vial (-1.2)", impact: "Negativo", weight: 0.70 },
            { factor: "Peso Educación (+2.5)", impact: "Positivo", weight: 0.88 },
            { factor: "Intersepto del Modelo", impact: "Base", weight: 0.50 }
          ]
        }
      },
      {
        zone_code: "2",
        potential_score: 0.44,
        confidence: 0.99,
        interpretation: {
          label: "Bolívar (Z3)",
          business_summary: "Puntuación baja generada por el coeficiente negativo asociado a los altos costos energéticos de la región."
        },
        color_code: "#f59e0b",
        model_evidence: {
          algorithm: "linear",
          main_factors: [
            { factor: "Peso Costo Energía (-2.8)", impact: "Negativo", weight: 0.92 },
            { factor: "Peso Infraestructura (+1.1)", impact: "Positivo", weight: 0.60 },
            { factor: "Intersepto del Modelo", impact: "Base", weight: 0.50 }
          ]
        }
      }
    ],
    recommendations: [
      { variable: "Peso Consumo Interno (+4.1)", impact: 0.99, recommendation: "Focalizar el presupuesto de marketing en las subregiones con mayor gasto de consumo.", type: "opportunity" },
      { variable: "Peso Densidad (+3.2)", impact: 0.95, recommendation: "Abrir puntos de venta express de alta rotación en las zonas más densamente pobladas.", type: "opportunity" },
      { variable: "Peso Costo Energía (-2.8)", impact: 0.92, recommendation: "Invertir en paneles solares y autogeneración para contrarrestar el impacto del coeficiente negativo de energía.", type: "risk" }
    ],
    model_metrics: {
      n_zones: 4,
      r2_score: 0.81,
      feature_importances: {
        "Peso Consumo Interno (+4.1)": 0.50,
        "Peso Densidad (+3.2)": 0.30,
        "Peso Costo Energía (-2.8)": 0.15,
        "Peso Distancia Vial (-1.2)": 0.05
      }
    }
  }
}
