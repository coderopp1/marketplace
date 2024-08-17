import {z} from 'zod'
export const productSchema=z.object({
    name :z.string(),
    descrition : z.string(),
    status :z.enum(["draft","published","archived"]),
    price: z.number().min(1),
    images :z.array(z.string()).min(1,"atleast one image required"),
    category :z.enum(["men","women","kids"]),
    isFeatured:z.boolean().optional(),
  
});
export const bannerSchema=z.object({
    title:z.string(),
    imageString:z.string(),
});