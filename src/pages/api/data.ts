import type { NextApiRequest, NextApiResponse } from "next";

let storeData = {};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    storeData = req.body;
  } else if (req.method === "GET") {
    res.status(200).json(storeData);
  }
}
