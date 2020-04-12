import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";

export default {
  getMoviesFrByYear(year, page) {
    if (typeof year == "undefined") {
      year = 1930;
    }
    if (typeof page == "undefined") {
      page = 1;
    }
    return axios.get(
      `${baseUrl}/discover/movie?api_key=c022388163d1fd502e4967b01c1cf1b8&language=fr-FR&sort_by=release_date.asc&include_adult=false&year=${year}&with_original_language=fr&page=${page}`
    );
  },
  getMovieById(id) {
    if (typeof id == "undefined") {
      id = 0;
    }
    return axios.get(
      `${baseUrl}/movie/${id}?api_key=c022388163d1fd502e4967b01c1cf1b8&language=fr-FR`
    );
  }
};
