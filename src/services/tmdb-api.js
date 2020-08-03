import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "c022388163d1fd502e4967b01c1cf1b8";

export default {

  // MOVIES LIST ///////////////////////////////////
  getMoviesFrByYear(year = 1930, page = 1) {
    return axios.get(
      `${baseUrl}/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=release_date.asc&include_adult=false&year=${year}&with_original_language=fr&page=${page}`
    );
  },
  // MOVIE ///////////////////////////////////
  getMovieDetails(id = 0) {
    return axios.get(
      `${baseUrl}/movie/${id}?api_key=${apiKey}&language=fr-FR`
    );
  },
  getMovieCredits(id = 0) {
    return axios.get(
      `${baseUrl}/movie/${id}/credits?api_key=${apiKey}&language=fr-FR`
    );
  },
  getMovieImages(id = 0) {
    return axios.get(
      `${baseUrl}/movie/${id}/images?api_key=${apiKey}`
    );
  },
  // PERSON ///////////////////////////////////
  getPersonDetails(id = 0) {
    return axios.get(
      `${baseUrl}/person/${id}?api_key=${apiKey}&language=fr-FR`
    );
  },
  getPersonCredits(id = 0) {
    return axios.get(
      `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}&language=fr-FR`
    );
  },
  getPersonImages(id = 0) {
    return axios.get(
      `${baseUrl}/person/${id}/images?api_key=${apiKey}`
    );
  },
  searchPerson(query, page = 1) {
    return axios.get(
      `${baseUrl}/search/person?api_key=${apiKey}&query=${query}&language=fr-FR&page=${page}`
    );
  },
  // GENRE ///////////////////////////////////
  getGenresList() {
    return axios.get(
      `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=fr-FR`
    );
  },

};
