import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Recommend.module.css";
import { useState, useEffect } from "react";
import SectionCards from "@/components/card/section-card";
import Loader from "@/components/Loader/Loader";
import { MdOutlineArrowBack } from "react-icons/md";
import Link from "next/link";
import { getMovies } from "../../lib/movies";

const inter = Inter({ subsets: ["latin"] });

interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Recommend() {
  const [movieDetails, setMovieDetails] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let movieName = "war";
  let page = 3;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const randomTitles = [
    "war",
    "thriller",
    "action",
    "horror",
    "comedy",
    "romantic",
    "western",
    "fantasy",
    "adventure",
    "crime",
    "mystery",
    "documentary",
    "history",
    "superhero",
    "animation",
    "musical",
    "drama",
    "martial arts",
    "murder",
    "love",
    "money",
    "fight",
    "game",
    "all",
    "will",
  ];

  const getRecommendedMovies = async (name: string, page: number) => {
    try {
      const response = await fetch(
        `/api/getMoviesByTitle?s=${name}&page=${page}`,
        options
      );
      const movies = await response.json();
      setMovieDetails(movies.Search);
      setIsLoading(false);
    } catch (error) {
      console.log("Went wrong from Recommendation", error);
    }
  };

  const saveData = async (name: string, page: number) => {
    const response = await fetch("http://localhost:3001/recommenders/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, page }),
    });

    return response.json();
  };

  const handleRecommend = () => {
    const movieTitle =
      randomTitles[Math.floor(Math.random() * randomTitles.length)];
    setIsLoading(true);
    movieName = movieTitle;
    const randomPage = Math.ceil(Math.random() * 10);
    page = randomPage;
    getRecommendedMovies(movieName, randomPage);
    saveData(movieTitle, randomPage);
  };

  useEffect(() => {
    const initialRecommendation = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/recommenders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dbData = await response.json();
      const data = await getMovies(dbData[0].name, dbData[0].page);
      setMovieDetails(data.Search);
      setIsLoading(false);
    };
    initialRecommendation();
  }, []);

  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <button className={styles.fluidButton} onClick={handleRecommend}>
          Click to Get Some movie recommendations
        </button>
        <Link href="/">
          <MdOutlineArrowBack className={styles.icon} />
        </Link>
        {isLoading ? (
          <Loader />
        ) : (
          movieDetails?.length > 0 && (
            <div className={styles.sectionWrapper}>
              <div className={styles.container}>
                <SectionCards movies={movieDetails} size="medium" />
              </div>
            </div>
          )
        )}
      </main>
    </>
  );
}
