import { Response } from "express";
import { CustomRequest } from "../interfaces/request";
import sendResponse from "../helpers/responseHelper";
import {
  applyJobSchema,
  createPostSchema,
} from "../validationSchemas/postsSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: CustomRequest, res: Response) => {
  const title = req.query.title as string;

  const whereOptions: any = {};

  if (title) {
    whereOptions.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  const posts = await prisma.job.findMany({
    where: whereOptions,
  });

  sendResponse(res, posts);
};

export const applyToPost = async (req: CustomRequest, res: Response) => {
  await applyJobSchema.validate(req.body);
  const userId = req.userId as string;
  console.log("🚀 ~ file: posts.ts:41 ~ applyToPost ~ req.body:", req.body);
  const { jobId } = req.body;

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  const currentApplications = job.applications || [];
  currentApplications.push(userId);

  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      applications: currentApplications, // Update the applications array with the new value
    },
  });

  sendResponse(res);
};
