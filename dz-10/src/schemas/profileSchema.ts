import { z } from "zod";

export const profileSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Name must have 3 symbols minimum"),

    email: z.email("Please enter a valid email"),

    birthDate: z
      .string()
      .min(1, "Date of birth is required"),

    accountType: z.enum(["personal", "business"]),

    companyName: z.string().optional(),

    role: z.enum([
      "developer",
      "designer",
      "manager",
      "other",
    ]),

    otherRole: z.string().optional(),

    newsletter: z.boolean(),

    frequency: z.enum(["daily", "weekly"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.birthDate) {
      const birth = new Date(`${data.birthDate}T00:00:00`);
      const today = new Date();

      let age = today.getFullYear() - birth.getFullYear();

      const birthdayNotReached =
        today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
          today.getDate() < birth.getDate());

      if (birthdayNotReached) {
        age--;
      }

      if (birth > today || age < 18) {
        ctx.addIssue({
          code: "custom",
          message: "You must be at least 18 years old",
          path: ["birthDate"],
        });
      }
    }

    if (
      data.accountType === "business" &&
      !data.companyName?.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Company name is required",
        path: ["companyName"],
      });
    }

    if (data.role === "other" && !data.otherRole?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Please specify your role",
        path: ["otherRole"],
      });
    }

    if (data.newsletter && !data.frequency) {
      ctx.addIssue({
        code: "custom",
        message: "Please select newsletter frequency",
        path: ["frequency"],
      });
    }
  });

export type ProfileFormData = z.infer<typeof profileSchema>;
