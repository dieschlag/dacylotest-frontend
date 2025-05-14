import { z } from "zod";

export const quoteSchema = z.object({
  id: z.number().positive(),
  paragraph: z.string(),
});

export type Quote = z.infer<typeof quoteSchema>;
