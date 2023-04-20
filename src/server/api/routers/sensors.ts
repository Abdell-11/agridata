import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sensordata } from "@prisma/client";

export const sensorRouter = createTRPCRouter({
  getLatestDataByNode: publicProcedure.input(z.number().optional()).mutation(
    async ({ ctx, input }) =>
      await ctx.prisma.sensordata.findFirst({
        where: input ? { node: input } : undefined,
        orderBy: {
          createdat: "desc",
        },
      })
  ),
  getLatestDataPerNode: publicProcedure.query(async ({ ctx }) => {
    const sensorDataArray = await ctx.prisma.sensordata.findMany();
    const latestDataPerNode = new Map<number, sensordata>();
    for (const data of sensorDataArray) {
      const currentNode = data.node;
      const existingData = latestDataPerNode.get(currentNode);

      // If the map doesn't have data for the current node or the new data is more recent, update the map
      if (!existingData || data.createdat > existingData.createdat) {
        latestDataPerNode.set(currentNode, {
          ...data,
          createdat: data.createdat || new Date(),
          soil: data.soil || NaN,
          gas: data.gas || NaN,
          pressure: data.pressure || NaN,
          temperature: data.temperature || NaN,
          humidity: data.humidity || NaN,
        });
      }
    }
    return Array.from(latestDataPerNode.values());
  }),

  graphData: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.sensordata
      .findMany({
        select: {
          temperature: true,
          pressure: true,
          humidity: true,
          gas: true,
          soil: true,
          createdat: true,
        },
        orderBy: {
          createdat: "desc",
        },
      })
      .then((res) => {
        const transformedSensorData = { data: {} };
        Object.keys(res[0])
          .filter((column) => column !== "createdat")
          .forEach((column) => {
            transformedSensorData.data[column] = res.map((data) => ({
              value: data[column],
              createdat: data.createdat || "",
            }));
          });
        return transformedSensorData;
      })
      .then((res) => {
        return res;
      });
  }),

  getData: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sensordata
      .findMany({
        select: {
          temperature: true,
          pressure: true,
          humidity: true,
          gas: true,
          soil: true,
          createdat: true,
        },
        orderBy: {
          createdat: "desc",
        },
      })
      .then((res) => {
        const transformedSensorData = { data: {} };
        Object.keys(res[0])
          .filter((column) => column !== "createdat")
          .forEach((column) => {
            transformedSensorData.data[column] = res.map((data) => ({
              value: data[column],
              createdat: data.createdat || "",
            }));
          });
        return transformedSensorData;
      })
      .then((res) => {
        return res;
      });
  }),
});
