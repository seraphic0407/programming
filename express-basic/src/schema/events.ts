import * as yup from "yup";

export const postEventSchema = yup.object({
  title: yup.string().required().max(150),
  genre: yup.string().required().max(50),
  description: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  location: yup.string().required().max(150),
  city: yup.string().required().max(100),
  price: yup.number().required().min(0),
  imageUrl: yup.string().nullable().default(null),
  ticketAvailable: yup.boolean().required(),
});
