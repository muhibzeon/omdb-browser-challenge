import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Search.module.css";
import { useEffect, useState } from "react";
import { getMovies } from "../../lib/movies";
import SectionCards from "@/components/card/section-card";
import ReactPaginate from "react-paginate";
import Loader from "@/components/Loader/Loader";

const inter = Inter({ subsets: ["latin"] });

interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Search() {
  const [movieName, setMovieName] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<Movies[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMovieName(event.currentTarget.value);
  };

  const handleClick = () => {
    setPage(1);
    getMoviesToDisplay(page);
  };

  const handlePageClick = (event: any) => {
    console.log("pagination is clicked", event.selected);
    setPage(event.selected + 1);
    getMoviesToDisplay(event.selected + 1);
  };

  const saveData = async (name: string, page: number) => {
    const response = await fetch("http://localhost:3001/searchData/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, page }),
    });
    return response.json();
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const getMoviesToDisplay = async (page: number) => {
    try {
      setIsLoading(true);
      saveData(movieName, page);
      const response = await fetch(
        `/api/getMoviesByTitle?s=${movieName}&page=${page}`,
        options
      );
      const movies = await response.json();
      setMovieDetails(movies.Search);
      setTotal(Math.ceil(movies.totalResults / 10));
      setIsLoading(false);
    } catch (error) {
      console.log("Went wrong from index", error);
    }
  };

  useEffect(() => {
    const initialMovies = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/searchData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dbData = await response.json();
      const data = await getMovies(dbData[0].name, dbData[0].page);
      setMovieDetails(data.Search);
      setMovieName(dbData[0].name);
      setTotal(Math.ceil(data.totalResults / 10));
      setIsLoading(false);
      setPage(dbData[0].page);
    };
    initialMovies();
  }, []);

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {/* update with search page code */}
        <label className={styles.label}>Search for a movie:</label>
        <div className={styles.search}>
          <div className={styles.searchBox}>
            <input
              type="text"
              id="site-search"
              name="input"
              value={movieName}
              placeholder="Search for any movie..."
              className={styles.input}
              onChange={handleChange}
            />
            <button
              type="submit"
              className={styles.button}
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : movieDetails?.length > 0 ? (
          <div className={styles.sectionWrapper}>
            <div className={styles.container}>
              <SectionCards
                movies={movieDetails}
                size="medium"
                shouldWrap={true}
                shouldScale={true}
              />
            </div>
          </div>
        ) : (
          <div className={styles.errorText}>
            No Movies Found...Please try with another movie title
          </div>
        )}

        <div>
          <ReactPaginate
            previousLabel={"Back"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={total}
            marginPagesDisplayed={1}
            pageRangeDisplayed={7}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          />
        </div>
      </main>
    </>
  );
}
