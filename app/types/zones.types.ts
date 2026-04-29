import { ZoneItem } from "../schemas/zones";

export type ZonesResult = {
  succcess: boolean;
  data?: ZoneItem[];
  error?: string;
};