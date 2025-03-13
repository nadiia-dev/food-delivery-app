import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Full Name should be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  street: z.string().min(2, "Street should be at least 2 characters long"),
  postalCode: z.string().regex(/^\d+$/, "Postal Code must be numeric"),
  city: z.string().min(2, "City should be at least 2 characters long"),
});
