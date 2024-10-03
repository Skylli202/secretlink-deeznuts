import { z } from "zod";

export const formSchema = z.object({
  data: z.string(),
  iv: z.string(),
  keyPubPart: z.string(),
})

export type FormSchema = typeof formSchema
