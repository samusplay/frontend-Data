export const GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL ||
  process.env.API_GATEWAY_URL ||
  "http://localhost:8000";

export const CONFIGURATION_SERVICE_URL =
  process.env.NEXT_PUBLIC_CONFIGURATION_SERVICE_URL ||
  process.env.CONFIGURATION_SERVICE_URL ||
  "";
