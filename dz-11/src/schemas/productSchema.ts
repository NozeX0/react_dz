import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(2, 'Назва повинна містити хоча б 2 символи'),
  price: z.number({ message: 'Ціна має бути числом' }).positive('Ціна повинна бути більшою за 0'),
  category: z.string().min(2, 'Оберіть або введіть категорію'),
  description: z.string().min(10, 'Опис має містити щонайменше 10 символів'),
});

export type ProductFormData = z.infer<typeof productSchema>;