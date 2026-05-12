import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, services, testimonials, Project, Service, Testimonial } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Projects queries
export async function getAllProjects(): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, 1))
      .orderBy(desc(projects.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get featured projects:", error);
    return [];
  }
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  try {
    const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get project:", error);
    return undefined;
  }
}

// Services queries
export async function getAllServices(): Promise<Service[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(services).orderBy(services.order);
  } catch (error) {
    console.error("[Database] Failed to get services:", error);
    return [];
  }
}

// Testimonials queries
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get testimonials:", error);
    return [];
  }
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.featured, 1))
      .orderBy(desc(testimonials.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[Database] Failed to get featured testimonials:", error);
    return [];
  }
}
