import type { NextApiRequest, NextApiResponse } from "next";

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.send("Hello World");
}
