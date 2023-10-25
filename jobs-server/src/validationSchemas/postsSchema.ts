import { object, string } from "yup";

export const createPostSchema = object({
  title: string().required().min(3),
  content: string().required().nonNullable(),
});

export const applyJobSchema = object({
  jobId: string().required(),
});
