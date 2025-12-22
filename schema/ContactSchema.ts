import { z as zod } from "zod";

export const ContactSchema = (selectedCountry: any) =>
  zod.object({
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
          message: "Invalid phone number",
        }
      ),

    message: zod.string().min(1, "The message is required"),
    token: zod.string().min(1, "The token is required"),
    country: zod.string().optional(),
  });
