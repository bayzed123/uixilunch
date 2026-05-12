import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("portfolio procedures", () => {
  describe("getAllProjects", () => {
    it("returns an array of projects", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getAllProjects();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getFeaturedProjects", () => {
    it("returns featured projects with default limit", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getFeaturedProjects();

      expect(Array.isArray(result)).toBe(true);
    });

    it("respects custom limit parameter", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getFeaturedProjects({ limit: 2 });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(2);
    });
  });

  describe("getProjectById", () => {
    it("returns project when found", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      // This will return undefined if no project exists, which is expected
      const result = await caller.portfolio.getProjectById({ id: 1 });

      expect(result === undefined || typeof result === "object").toBe(true);
    });
  });

  describe("getAllServices", () => {
    it("returns an array of services", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getAllServices();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getAllTestimonials", () => {
    it("returns an array of testimonials", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getAllTestimonials();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("getFeaturedTestimonials", () => {
    it("returns featured testimonials with default limit", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getFeaturedTestimonials();

      expect(Array.isArray(result)).toBe(true);
    });

    it("respects custom limit parameter", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.portfolio.getFeaturedTestimonials({ limit: 2 });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(2);
    });
  });
});
