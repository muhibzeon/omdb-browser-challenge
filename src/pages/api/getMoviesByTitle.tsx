import { NextApiRequest, NextApiResponse } from "next";
import { getMovies } from "../../../lib/movies";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function getMoviesByTitle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const movieName = req.query;
    const { s, page } = movieName;
    const response = await getMovies(s, page);
    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500);
    console.error("Something went wrong", error);
  }
}
