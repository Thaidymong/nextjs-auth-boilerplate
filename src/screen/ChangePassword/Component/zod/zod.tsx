import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty({ message: "Current password is required." }),
    password: z.string().nonempty({ message: "New password is required." }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm New Password is required*" }),
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
