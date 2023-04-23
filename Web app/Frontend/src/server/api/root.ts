import { createTRPCRouter } from "~/server/api/trpc";
import { sensorRouter as sensorData } from "~/server/api/routers/sensors";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sensorData,
});

// export type definition of API
export type AppRouter = typeof appRouter;
