import Card from "./Card";
import styles from "./section-card.module.css";
import clsx from "classnames";
import Link from "next/link";
interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
  Type: string;
  Poster: string;
}

type sectionCardProps = {
  movies: Movies[];
  size: string;
  shouldWrap: boolean;
  shouldScale: boolean;
};

const SectionCards: React.FC<sectionCardProps> = (props) => {
  const { movies = [], size, shouldWrap = true, shouldScale } = props;
  return (
    <section className={styles.container}>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {movies.length > 0 &&
          movies.map((movie: Movies, idx: number) => {
            return (
              <Link href={`/movie/${movie.imdbID}`} key={idx}>
                <Card
                  key={movie.imdbID}
                  id={movie.imdbID}
                  imgUrl={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                  }
                  size={size}
                  shouldScale={shouldScale}
                  Title={movie.Title}
                  year={movie.Year}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SectionCards;
