import { z } from "zod";

export const updateProfileSchema = z
  .object({
    first_name: z.string().nonempty({ message: "First Name is required*" }),
    last_name: z.string().nonempty({ message: "Last Name is required*" }),
  });

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>