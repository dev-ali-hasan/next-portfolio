import { z as zod } from "zod";

export const ContactSchema = (selectedCountry: any) =>
  zod
    .object({
      name: zod.string().min(1, "The first name is required"),

      email: zod
        .string()
        .min(1, "The email is required")
        .email("Enter a valid email"),

      phone: zod
        .string()
        .min(1, "The phone number is required")
        .refine(
          (val) => {
            if (!selectedCountry) return true;

            const digits = val.replace(/\D/g, "");
            return (
              digits.length >= selectedCountry.minLength &&
              digits.length <= selectedCountry.maxLength
            );
          },
          {
            params: {
              min: selectedCountry?.minLength,
              max: selectedCountry?.maxLength,
            },
            message: 'Invalid phone number',
          }
        ),

      password: zod
        .string()
        .min(1, "The password is required")
        .min(6, "Must be at least 6 characters")
        .refine((val) => /[a-z]/.test(val), {
          message: "Must have one lowercase letter",
        })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Must have one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
          message: "Must have one number",
        }),

      confirm_password: zod.string().min(1, "The confirm password is required"),
      country: zod.string().optional()
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });