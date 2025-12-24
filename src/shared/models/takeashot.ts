import { and, desc, eq } from 'drizzle-orm';

import { db } from '@/core/db';
import { takeashotGeneration } from '@/config/db/schema';

export type TakeashotGeneration = typeof takeashotGeneration.$inferSelect;
export type NewTakeashotGeneration = typeof takeashotGeneration.$inferInsert;
export type UpdateTakeashotGeneration = Partial<Omit<NewTakeashotGeneration, 'id' | 'createdAt'>>;

export async function createTakeashotGeneration(data: NewTakeashotGeneration) {
    const [result] = await db().insert(takeashotGeneration).values(data).returning();
    return result;
}

export async function findTakeashotGenerationById(id: string) {
    const [result] = await db()
        .select()
        .from(takeashotGeneration)
        .where(eq(takeashotGeneration.id, id));
    return result;
}

export async function getTakeashotGenerationsByUserId(userId: string, limit = 50) {
    const result = await db()
        .select()
        .from(takeashotGeneration)
        .where(eq(takeashotGeneration.userId, userId))
        .orderBy(desc(takeashotGeneration.createdAt))
        .limit(limit);
    return result;
}

export async function updateTakeashotGenerationById(id: string, data: UpdateTakeashotGeneration) {
    const [result] = await db()
        .update(takeashotGeneration)
        .set(data)
        .where(eq(takeashotGeneration.id, id))
        .returning();
    return result;
}
