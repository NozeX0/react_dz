import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(2, "Ім'я занадто коротке"),
  lastName: z.string().min(2, "Прізвище занадто коротке"),
  email: z.string().email('Некоректний формат email'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;