import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const sensorRouter = createTRPCRouter({
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
