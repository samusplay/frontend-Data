import { z } from "zod";

export const AuditEventSchema = z.object({
  id: z.number().optional(),
  event_type: z.string(),
  service_name: z.string(),
  reference_id: z.string(),
  trace_id: z.string(),
  event_summary: z.string(),
  status: z.string().default("SUCCESS"),
  created_at: z.string().optional(),
});

export const AuditResponseSchema = z.array(AuditEventSchema);

export type AuditEvent = z.infer<typeof AuditEventSchema>;
