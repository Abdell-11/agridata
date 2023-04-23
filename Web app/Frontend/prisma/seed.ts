import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

(async () => {
  const data = await prisma.sensordata.createMany({
    data: Array.from({ length: 1000 }).map(() => ({
      node: faker.datatype.number({ min: 1, max: 9 }),
      temperature: faker.datatype.number({
        min: -10,
        max: 50,
        precision: 0.01,
      }),
      humidity: faker.datatype.number({
        min: 0,
        max: 100,
        precision: 0.01,
      }),
      pressure: faker.datatype.number({
        min: 900,
        max: 1100,
        precision: 0.01,
      }),
      gas: faker.datatype.number({
        min: 0,
        max: 100,
        precision: 0.01,
      }),
      soil: faker.datatype.number({
        min: 0,
        max: 100,
        precision: 0.01,
      }),
      createdat: faker.date.past(),
      longitude: faker.datatype.number({
        min: -5.10859,
        max: -5.107518,
        precision: 0.0001,
      }),
      latitude: faker.datatype.number({
        min: 33.542854,
        max: 33.543752,
        precision: 0.0001,
      }),
    })),
  });
  console.log(data);
})().finally(() => {
  console.log("Closing prisma connection");
});
