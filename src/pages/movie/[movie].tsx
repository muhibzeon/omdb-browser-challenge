import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Movie.module.css";
import Loader from "@/components/Loader/Loader";

interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
  Country: string;
  Rated: string;
  Genre: string;
  Plot: string;
  Production: string;
  Runtime: string;
  imdbRating: string;
  Actors: string;
  Director: string;
  BoxOffice: string;
}

const Movie = () => {
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const movieId = router.query.movie;

  //get movies by id
  const getMovie = async () => {
    const response = await fetch(`/api/getMoviesById?i=${movieId}`);
    const data = await response.json();
    setMovie(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [movieId]);

  return (
    <div>
      {isLoading ? (
        <p className={styles.text}>Loading...</p>
      ) : (
        movie !== undefined && (
          <div className={styles.showRoute}>
            <div className={styles.showContent}>
              <div className={styles.showPoster}>
                <span>
                  <img
                    className={styles.img}
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/163x240/111217/FFFFFF/?text=No%20Image"
                    }
                    alt={movie.Title}
                  />

                  <p className={styles.home} onClick={() => router.back()}>
                    Go Back
                  </p>
                </span>
              </div>

              <div className={styles.showDetail}>
                <h2 className={styles.h2}>{movie.Title}</h2>
                <ul className={styles.showTags}>
                  <li className={styles.li}>{movie.Country}</li>
                  <li className={styles.li}>{movie.Year}</li>
                  <li className={styles.li}>{movie.Rated}</li>
                  <li className={styles.li}>{movie.Genre}</li>
                </ul>
                <div className={styles.showPlot}>
                  <p className={styles.p}>{movie.Plot}</p>
                </div>

                <div className={styles.p}>
                  <p>
                    <strong>Production:</strong> {movie.Production}
                  </p>
                  <p>
                    <strong>Runtime:</strong> {movie.Runtime || "N/A "}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.imdbRating}
                  </p>
                  <p>
                    <strong>Director:</strong> {movie.Director}
                  </p>
                  <p>
                    <strong>Actors:</strong> {movie.Actors}
                  </p>
                  <p>
                    <strong>BoxOffice:</strong> {movie.BoxOffice || "N/A "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Movie;
