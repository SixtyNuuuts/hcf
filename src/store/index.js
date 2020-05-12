import Vue from 'vue'
import Vuex from 'vuex'
import tmdbApi from "../services/tmdb-api";
import f from "../services/func";
import db from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMovie: {
      backdrop_path: null,
      genres: [
        {
          id: null,
          name: null
        }
      ],
      id: null,
      original_title: null,
      overview: null,
      poster_path: null,
      release_date: "1930-01-01",
      runtime: null,
      vote_average: null,
      production_countries: [
        {
          iso_3166_1: null,
          name: null
        }
      ]
    },
    currentMovieCrew: [
      { id: null, name: null, jobs: [], gender: null, profile_path: null, order: null }
    ],
    currentMovieCast: [
      { id: null, name: null, character: null, gender: null, profile_path: null, order: null }
    ],
    currentMovieListByYear: [],
    currentDocumentedMovieListByYear: [],
    currentDocumentedMovie: {
      colLeftContent: [],
      colRightContent: [],
    }
  },
  mutations: {
    SET_CURRENT_MOVIE (state, payload) {
      state.currentMovie = payload;
    },
    SET_CURRENT_MOVIE_CREW (state, payload) {
      state.currentMovieCrew = payload;
    },
    SET_CURRENT_MOVIE_CAST (state, payload) {
      state.currentMovieCast = payload;
    },
    SET_CURRENT_MOVIE_DOCUMENTED (state, payload) {
      state.currentDocumentedMovie = payload;
    },
    ADD_MOVIE_LIST_PAGE_TO_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY (state, payload) {
      state.currentMovieListByYear = [...state.currentMovieListByYear, ...payload]
    },
    RESET_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY (state) {
      state.currentMovieListByYear = []
    },
    ADD_DOCU_MOVIE_TO_CURRENT_DOCU_MOVIE_LIST_BY_YEAR (state, payload) {
      state.currentDocumentedMovieListByYear.push(payload);
    },
    RESET_CURRENT_DOCU_MOVIE_LIST_BY_YEAR (state) {
      state.currentDocumentedMovieListByYear = []
    },
    RESET_CURRENT_MOVIE_DOCUMENTED (state) {
      state.currentDocumentedMovie = {
        colLeftContent: [],
        colRightContent: [],
      }
    },
    ADD_CONTENT_TO_DOCUMENTED_MOVIE (state, payload) {
      if (payload.col === 'left') {
        state.currentDocumentedMovie.colLeftContent.push(payload.content)
      }
      if (payload.col === 'right') {
        state.currentDocumentedMovie.colRightContent.push(payload.content)
      }
    },
    REMOVE_CONTENT_FROM_DOCUMENTED_MOVIE (state, payload) {
      if (payload.col === 'left') {
        state.currentDocumentedMovie.colLeftContent.splice(state.currentDocumentedMovie.colLeftContent.indexOf(payload.content), 1)
      }
      if (payload.col === 'right') {
        state.currentDocumentedMovie.colRightContent.splice(state.currentDocumentedMovie.colRightContent.indexOf(payload.content), 1)
      }
    },
    ADD_PERSON_TO_MOVIE_CREW (state, payload) {
      state.currentMovieCrew.push(payload)
    },
    REMOVE_PERSON_FROM_MOVIE_CREW (state, payload) {
      state.currentMovieCrew.splice(state.currentMovieCrew.indexOf(payload), 1)
    },
    ADD_JOB_TO_PERSON (state, payload) {
      payload.person.jobs.push(payload.job)
    },
    REMOVE_JOB_FROM_PERSON (state, payload) {
      payload.person.jobs.splice(payload.person.jobs.indexOf(payload.job), 1);
    },
    ADD_PERSON_TO_MOVIE_CAST (state, payload) {
      state.currentMovieCast.push(payload)
    },
    REMOVE_PERSON_FROM_MOVIE_CAST (state, payload) {
      state.currentMovieCast.splice(state.currentMovieCast.indexOf(payload), 1)
    },
  },
  actions: {
    getCurrentMovie ({commit}, payload) {
      db.collection("movies").doc(payload).get()
      .then((doc) => {
          if (doc.exists && doc.data().movie) {
            console.log("MOVIE : FIREBASE");
            commit('SET_CURRENT_MOVIE', doc.data().movie);
          } else {
            console.log("MOVIE : TMDB");
            tmdbApi.getMovieDetails(payload).then(res => {
              const movie = res.data
              f.backdropPath(movie)
              f.posterPath(movie)
              commit('SET_CURRENT_MOVIE', movie);
            }).catch(function(error) {console.log("Error TMDB:", error)});      
          }
      }).catch(function(error) {
          console.log("Error firebase:", error);
      });
    },
    getMovieCrew ({commit}, payload) {
      db.collection("movies").doc(payload).get()
      .then((doc) => {
          if (doc.exists && doc.data().movieCrew) {
            console.log("MOVIE_CREW : FIREBASE");
            commit('SET_CURRENT_MOVIE_CREW', doc.data().movieCrew);
          } else {
            console.log("MOVIE_CREW : TMDB");
            tmdbApi.getMovieCredits(payload).then(res => {
              const crew = f.movieCrewFormat(res.data.crew)
              crew.forEach(person => { 
                f.profilePath(person)
              })
              commit('SET_CURRENT_MOVIE_CREW', crew);
            }).catch(function(error) {console.log("Error TMDB:", error)});      
          }
      }).catch(function(error) {
          console.log("Error firebase:", error);
      });
    },
    getMovieCast ({commit}, payload) {
      db.collection("movies").doc(payload).get()
      .then((doc) => {
          if (doc.exists && doc.data().movieCast) {
            console.log("MOVIE_CAST : FIREBASE");
            commit('SET_CURRENT_MOVIE_CAST', doc.data().movieCast);
          } else {
            console.log("MOVIE_CAST : TMDB");
            tmdbApi.getMovieCredits(payload).then(res => {
              const cast = res.data.cast
              cast.forEach(person => { 
                person.order += 1
                f.profilePath(person)
              })
              commit('SET_CURRENT_MOVIE_CAST', cast);
            }).catch(function(error) {console.log("Error TMDB:", error)});      
          }
      }).catch(function(error) {
          console.log("Error firebase:", error);
      });
    },
    getMovieDocumented ({commit}, payload) {
      commit('RESET_CURRENT_MOVIE_DOCUMENTED');
      db.collection("movies").doc(payload).get()
      .then((doc) => {
          if (doc.exists && doc.data().movieDocumented) {
            console.log("MOVIE_DOCUMENTED");
            commit('SET_CURRENT_MOVIE_DOCUMENTED', doc.data().movieDocumented);
          } else {
            console.log("MOVIE NOT DOCUMENTED");
          }
      }).catch(function(error) {
          console.log("Error firebase:", error);
      });
    },
    getDocumentedMoviesByYear ({commit}, payload) {
      commit('RESET_CURRENT_DOCU_MOVIE_LIST_BY_YEAR');
      db.collection("movies").where("documented", "==", true).where("year", "==", payload)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(payload, doc.data().movie)
          commit('ADD_DOCU_MOVIE_TO_CURRENT_DOCU_MOVIE_LIST_BY_YEAR', doc.data().movie);
        });
      }).catch(function(error) {
          console.log("Error firebase:", error);
      });
    },
    getMoviesByYear ({commit}, payload) {
      tmdbApi.getMoviesFrByYear(payload, 1).then(res => {
        commit('RESET_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY');
        for (let page = 1; page <= res.data.total_pages; page++) {
          tmdbApi.getMoviesFrByYear(payload, page).then(res => {
            commit('ADD_MOVIE_LIST_PAGE_TO_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY', res.data.results);
          })
        }
      })
    },
  },
  // getters: {
  //   currentMovie (state) {
  //     return state.currentMovie;
  //   },
  //   currentMovieCrew (state) {
  //     return state.currentMovieCrew;
  //   },
  //   currentMovieCast (state) {
  //     return state.currentMovieCast;
  //   },
  // }
})
