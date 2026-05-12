import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getAllProjects, getFeaturedProjects, getProjectById, getAllServices, getAllTestimonials, getFeaturedTestimonials } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Portfolio procedures
  portfolio: router({
    // Get all projects
    getAllProjects: publicProcedure.query(async () => {
      const projects = await getAllProjects();
      return projects;
    }),

    // Get featured projects
    getFeaturedProjects: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const projects = await getFeaturedProjects(input?.limit);
        return projects;
      }),

    // Get project by ID
    getProjectById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const project = await getProjectById(input.id);
        return project;
      }),

    // Get all services
    getAllServices: publicProcedure.query(async () => {
      const services = await getAllServices();
      return services;
    }),

    // Get all testimonials
    getAllTestimonials: publicProcedure.query(async () => {
      const testimonials = await getAllTestimonials();
      return testimonials;
    }),

    // Get featured testimonials
    getFeaturedTestimonials: publicProcedure
      .input(z.object({ limit: z.number().optional() }).optional())
      .query(async ({ input }) => {
        const testimonials = await getFeaturedTestimonials(input?.limit);
        return testimonials;
      }),
  }),
});

export type AppRouter = typeof appRouter;
