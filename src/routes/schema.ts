import { z } from "zod";

export const formSchema = z.object({
  data: z.string(),
  iv: z.string(),
  keyPubPart: z.string(),
  maxViewCount: z.number().min(1, 'Maximum view counter cannot be set below one.').default(3),
})

export type FormSchema = typeof formSchema
