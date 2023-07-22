export const getMoviesByID = async function (id: any) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const apikey = "cb327798";
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apikey}&i=${id}&plot=full`,
    options
  );
  const data = await response.json();
  //console.log(data.Search);

  return data;
};
