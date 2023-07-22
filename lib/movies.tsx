export const getMovies = async function (movieName: any, page: any) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const apikey = "cb327798";

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apikey}&s=${movieName}&page=${page}&plot=full`,
    options
  );
  const data = await response.json();

  return data;
};
