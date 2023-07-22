import { NextApiRequest, NextApiResponse } from "next";
import { getMoviesByID } from "../../../lib/moviebyId";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function getMoviesById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query;
    const response = await getMoviesByID(id.i);
    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500);
    console.error("Something went wrong", error);
  }
}
