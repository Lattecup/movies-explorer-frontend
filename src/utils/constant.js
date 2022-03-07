export const moviesListCount = () => {
  if (window.innerWidth <= 320) {
    return 5;
  } else if (window.innerWidth <= 768) {
    return 8;
  } else {
    return 12;
  }
};

export const moreMovies = () => {
  if (window.innerWidth <= 768) {
    return 2;
  } else {
    return 3;
  }
};

export const searchMovie = (movies, keyword) => 
  movies.filter((movie) => {
    return JSON.stringify(movie).toLowerCase().includes(keyword.toLowerCase());
  });

export const filterShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
};