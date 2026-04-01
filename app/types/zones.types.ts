// types/zones.types.ts
export type ZonesSuccess = {
  success: true;
  data: string[];
};

export type ZonesError = {
  error: string;
};

export type ZonesResult = ZonesSuccess | ZonesError;