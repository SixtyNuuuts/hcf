import Vue from 'vue'
import Vuex from 'vuex'
import tmdbApi from "../services/tmdb-api";
import f from "../services/func";
import db from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isLoadingFilmo: false,
    isLoadingAllPersons: false,
    loadingErrorMess: null,
    currentUser: {
      loggedIn: false,
      admin: false,
      data: null
    },
    currentMovie: {},
    currentMovieCrew: [],
    currentMovieCast: [],
    currentMovieImages: [],
    currentMovieListByYear: [],
    currentDocumentedMovieListByYear: [],
    allDocumentedMovieList: [],
    currentDocumentedMovie: {
      colLeftContent: [],
      colRightContent: [],
    },
    currentYearSelected: 1930,
    currentFirstLetterSelected: "A",
    currentPerson: {},
    currentPersonCredits: [],
    currentPersonImages: [],
    currentDocumentedPerson: {
      colLeftContent: [],
      colRightContent: [],
    },
    currentPersonsList: [],
    allPersonsList: [],
    currentDocumentedMovieListYearSelected: null,
    currentPersonsListFirstLetterLastnameSelected: null,
    currentMovieId: null,
    currentPersonId: null,
  },
  mutations: {
    IS_LOADING (state, payload) {
      state.isLoading = payload;
    },
    IS_LOADING_FILMO (state, payload) {
      state.isLoadingFilmo = payload;
    },
    IS_LOADING_ALL_PERSONS (state, payload) {
      state.isLoadingAllPersons = payload;
    },
    SET_LOADING_ERROR_MESS (state, payload) {
      state.loadingErrorMess = payload;
    },
    RESET_LOADING_ERROR_MESS (state) {
      state.loadingErrorMess = null;
    },
    SET_CURRENT_YEAR_SELECTED (state, payload) {
      state.currentYearSelected = payload;
    },
    SET_CURRENT_FIRST_LETTER_SELECTED (state, payload) {
      state.currentFirstLetterSelected = payload;
    },
    SET_CURRENT_USER_IS_ADMIN (state, value) {
      state.currentUser.admin = value;
    },
    SET_CURRENT_USER_LOGGED_IN (state, value) {
      state.currentUser.loggedIn = value;
    },
    SET_CURRENT_USER (state, data) {
      state.currentUser.data = data;
    },  
    SET_CURRENT_MOVIE (state, payload) {
      state.currentMovie = payload;
    },
    SET_CURRENT_MOVIE_IMAGES (state, payload) {
      state.currentMovieImages = payload;
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
    SET_CURRENT_PERSON (state, payload) {
      state.currentPerson = payload;
    },
    SET_CURRENT_PERSON_CREDITS (state, payload) {
      state.currentPersonCredits = payload;
    },
    SET_CURRENT_PERSON_IMAGES (state, payload) {
      state.currentPersonImages = payload;
    },
    SET_CURRENT_PERSON_DOCUMENTED (state, payload) {
      state.currentDocumentedPerson = payload;
    },
    ADD_MOVIE_LIST_PAGE_TO_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY (state, payload) {
      state.currentMovieListByYear = [...state.currentMovieListByYear, ...payload]
    },
    ADD_MOVIE_IMAGES_LIST_TO_CURRENT_MOVIE_IMAGES (state, payload) {
      state.currentMovieImages = [...state.currentMovieImages, ...payload]
    },
    ADD_IMAGE_TO_MOVIE_IMAGES (state, payload) {
      state.currentMovieImages.push(payload)
    },
    ADD_IMAGE_TO_PERSON_IMAGES (state, payload) {
      state.currentPersonImages.push(payload)
    },
    REMOVE_IMAGE_FROM_MOVIE_IMAGES (state, payload) {
      state.currentMovieImages.splice(state.currentMovieImages.indexOf(payload), 1)
    },
    REMOVE_IMAGE_FROM_PERSON_IMAGES (state, payload) {
      state.currentPersonImages.splice(state.currentPersonImages.indexOf(payload), 1)
    },
    RESET_CURRENT_MOVIE_LIST_BY_YEAR_ARRAY (state) {
      state.currentMovieListByYear = []
    },
    ADD_DOCU_MOVIE_TO_CURRENT_DOCU_MOVIE_LIST_BY_YEAR (state, payload) {
      state.currentDocumentedMovieListByYear.push(payload);
    },
    ADD_DOCU_MOVIE_TO_ALL_DOCU_MOVIE_LIST (state, payload) {
      state.allDocumentedMovieList.push(payload);
    },
    RESET_CURRENT_MOVIE (state) {
      state.currentMovie = {}
    },
    RESET_CURRENT_MOVIE_CREW (state) {
      state.currentMovieCrew = []
    },
    RESET_CURRENT_MOVIE_CAST (state) {
      state.currentMovieCast = []
    },
    RESET_CURRENT_DOCU_MOVIE_LIST_BY_YEAR (state) {
      state.currentDocumentedMovieListByYear = []
    },
    RESET_ALL_DOCU_MOVIE_LIST (state) {
      state.allDocumentedMovieList = []
    },
    RESET_CURRENT_MOVIE_IMAGES (state) {
      state.currentMovieImages = []
    },
    RESET_CURRENT_MOVIE_DOCUMENTED (state) {
      state.currentDocumentedMovie = {
        colLeftContent: [],
        colRightContent: [],
      }
    },
    RESET_CURRENT_PERSON_DOCUMENTED (state) {
      state.currentDocumentedPerson = {
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
    ADD_CONTENT_TO_DOCUMENTED_PERSON (state, payload) {
      if (payload.col === 'left') {
        state.currentDocumentedPerson.colLeftContent.push(payload.content)
      }
      if (payload.col === 'right') {
        state.currentDocumentedPerson.colRightContent.push(payload.content)
      }
    },
    REMOVE_CONTENT_FROM_DOCUMENTED_PERSON (state, payload) {
      if (payload.col === 'left') {
        state.currentDocumentedPerson.colLeftContent.splice(state.currentDocumentedPerson.colLeftContent.indexOf(payload.content), 1)
      }
      if (payload.col === 'right') {
        state.currentDocumentedPerson.colRightContent.splice(state.currentDocumentedPerson.colRightContent.indexOf(payload.content), 1)
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
    ADD_JOB_TO_CURRENT_PERSON (state, payload) {
      payload.person.known_for_department.push(payload.job)
    },
    REMOVE_JOB_FROM_CURRENT_PERSON (state, payload) {
      payload.person.known_for_department.splice(payload.person.known_for_department.indexOf(payload.job), 1);
    },

    ADD_PERSON_TO_MOVIE_CAST (state, payload) {
      state.currentMovieCast.push(payload)
    },
    REMOVE_PERSON_FROM_MOVIE_CAST (state, payload) {
      state.currentMovieCast.splice(state.currentMovieCast.indexOf(payload), 1)
    },
    ADD_FILM_TO_FILMO (state, payload) {
      state.currentPersonCredits.push(payload)
    },
    ADD_JOB_TO_MOVIEFILMO (state, payload) {
      payload.movie.job.push(payload.job)
    },
    REMOVE_MOVIE_FROM_FILMO (state, payload) {
      state.currentPersonCredits.splice(state.currentPersonCredits.indexOf(payload), 1)
    },
    REMOVE_JOB_FROM_MOVIEFILMO (state, payload) {
      payload.movie.job.splice(payload.movie.job.indexOf(payload.job), 1);
    },
    ADD_CHARAC_TO_MOVIEFILMO (state, payload) {
      payload.movie.character.push(payload.character)
    },
    REMOVE_CHARAC_FROM_MOVIEFILMO (state, payload) {
      payload.movie.character.splice(payload.movie.character.indexOf(payload.character), 1);
    },
    RESET_CURRENT_PERSON (state) {
      state.currentPerson = {}
    },
    RESET_CURRENT_PERSON_CREDITS (state) {
      state.currentPersonCredits = []
    },
    RESET_CURRENT_PERSON_IMAGES (state) {
      state.currentPersonImages = []
    },
    ADD_PERSON_TO_CURRENT_PERSONS_LIST (state, payload) {
      state.currentPersonsList.push(payload);
    },
    RESET_CURRENT_PERSONS_LIST (state) {
      state.currentPersonsList = []
    },
    ADD_PERSON_TO_ALL_PERSONS_LIST (state, payload) {
      state.allPersonsList.push(payload);
    },
    RESET_ALL_PERSONS_LIST (state) {
      state.allPersonsList = []
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      if (user) {
        if(['dupuy.clement@wanadoo.fr'].includes(user.email))
          commit("SET_CURRENT_USER_IS_ADMIN", true);
          
        commit("SET_CURRENT_USER_LOGGED_IN", true);  
        commit("SET_CURRENT_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_CURRENT_USER", null);
      }
    },  
    getCurrentMovie ({commit,state}, payload) {
      if(!state.currentMovieId||state.currentMovieId!=payload)
      {
        commit('RESET_CURRENT_MOVIE');
        commit('IS_LOADING', true);
        commit('RESET_LOADING_ERROR_MESS');
        db.collection("movies").doc(payload).get()
        .then((doc) => {
            commit('IS_LOADING', false);
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
              }).catch(function(error) {
                console.log("Error TMDB:", error)
                if(payload) {
                  commit('SET_CURRENT_MOVIE', {id: parseInt(payload), backdrop_path: null, genres: [{id: null, name: null}], original_title: null, overview: null, poster_path: null, release_date: null, runtime: null, vote_average: null, production_countries: [{iso_3166_1: null,name: null}]});
                }
                if(error) {
                  const mess = "Nous n'avons pas trouvé le film demandé"
                  commit('SET_LOADING_ERROR_MESS', mess);
                }    
              });      
            }
            state.currentMovieId = payload;
            console.log('data getCurrentMovie loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
            if(error) {
              const mess = "Erreur lors du chargement du film, essayez de recharger la page ou de réessayer ultérieurement"
              commit('SET_LOADING_ERROR_MESS', mess);
            }
        });  
      }
    },
    getCurrentMovieCrew ({commit,state}, payload) {
      if(!state.currentMovieId||state.currentMovieId!=payload)
      {
        commit('RESET_CURRENT_MOVIE_CREW');
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
            state.currentMovieId = payload;
            console.log('data getCurrentMovieCrew loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getCurrentMovieCast ({commit,state}, payload) {
      if(!state.currentMovieId||state.currentMovieId!=payload)
      {
        commit('RESET_CURRENT_MOVIE_CAST');
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
            state.currentMovieId = payload;
            console.log('data getCurrentMovieCast loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getCurrentMovieImages ({commit,state}, payload) {
      if(!state.currentMovieId||state.currentMovieId!=payload)
      {
        commit('RESET_CURRENT_MOVIE_IMAGES');
        db.collection("movies").doc(payload).get()
        .then((doc) => {
            if (doc.exists && doc.data().movieImages) {
              console.log("MOVIE_IMAGES : FIREBASE");
              commit('SET_CURRENT_MOVIE_IMAGES', doc.data().movieImages);
            } else {
              console.log("MOVIE_IMAGES : TMDB");
              tmdbApi.getMovieImages(payload).then(res => {
                if(res.data.backdrops) {
                  let backdrops = res.data.backdrops
                  backdrops.forEach(movie => { 
                    f.filePath(movie)
                  })
                  backdrops = f.formatImgForGallery(backdrops)
                  commit('ADD_MOVIE_IMAGES_LIST_TO_CURRENT_MOVIE_IMAGES', backdrops);
                }
                if(res.data.posters) {
                  let posters = res.data.posters
                  posters.forEach(movie => { 
                    f.filePath(movie)
                  })
                  posters = f.formatImgForGallery(posters)
                  commit('ADD_MOVIE_IMAGES_LIST_TO_CURRENT_MOVIE_IMAGES', posters);
                }
              }).catch(function(error) {console.log("Error TMDB:", error)});      
            }
            state.currentMovieId = payload;
            console.log('data getCurrentMovieImages loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getCurrentMovieDocumented ({commit,state}, payload) {
      if(!state.currentMovieId||state.currentMovieId!=payload)
      {
        commit('RESET_CURRENT_MOVIE_DOCUMENTED');
        db.collection("movies").doc(payload).get()
        .then((doc) => {
            if (doc.exists && doc.data().movieDocumented) {
              console.log("MOVIE_DOCUMENTED");
              commit('SET_CURRENT_MOVIE_DOCUMENTED', doc.data().movieDocumented);
            } else {
              console.log("MOVIE NOT DOCUMENTED");
            }
            state.currentMovieId = payload;
            console.log('data getCurrentMovieDocumented loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getDocumentedMoviesByYear ({commit,state}, payload) {
      if(!state.currentDocumentedMovieListYearSelected||state.currentDocumentedMovieListYearSelected!=payload)
      {
        commit('RESET_CURRENT_DOCU_MOVIE_LIST_BY_YEAR');
        commit('RESET_LOADING_ERROR_MESS');
        commit('IS_LOADING', true);  
        db.collection("movies").where("documented", "==", true).where("year", "==", payload)
        .get()
        .then(function(querySnapshot) {
          commit('IS_LOADING', false);
          querySnapshot.forEach(function(doc) {
            if (doc.data().movie) {
              let movieDetail = doc.data().movie;
              if (doc.data().movieCrew) {
                let directors = [];
                doc.data().movieCrew.forEach(person => {
                  person.jobs.forEach(job => {
                    if (job.name === "Réalisateur") {
                      directors.push(person.name);
                    }
                  });
                });
                movieDetail.directors = directors;
              } 
              commit('ADD_DOCU_MOVIE_TO_CURRENT_DOCU_MOVIE_LIST_BY_YEAR', movieDetail);   
            }
          });
          state.currentDocumentedMovieListYearSelected = payload;
          console.log('data currentDocumentedMovieListYearSelected loaded');
        }).catch(function(error) {
            console.log("Error firebase:", error);
            if(error) {
              const mess = "Erreur lors du chargement des films, essayez de recharger la page ou de réessayer ultérieurement"
              commit('SET_LOADING_ERROR_MESS', mess);
            }
        });  
      }
    },
    getAllDocumentedMovies ({commit,state}) {
      if(!state.allDocumentedMovieList.length)
      {
        commit('RESET_ALL_DOCU_MOVIE_LIST');
        commit('IS_LOADING_FILMO', true);
        db.collection("movies")
        .get()
        .then(function(querySnapshot) {
          commit('IS_LOADING_FILMO', false);
          querySnapshot.forEach(function(doc) {
            if (doc.data().movie) {
              commit('ADD_DOCU_MOVIE_TO_ALL_DOCU_MOVIE_LIST', doc.data().movie);   
            }
          });
          console.log('data getAllDocumentedMovies loaded');
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });
      }
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
    getCurrentPerson ({commit,state}, payload) {
      if(!state.currentPersonId||state.currentPersonId!=payload)
      {
        commit('RESET_CURRENT_PERSON');
        commit('IS_LOADING', true);
        commit('RESET_LOADING_ERROR_MESS');
        db.collection("persons").doc(payload).get()
        .then((doc) => {
            commit('IS_LOADING', false);
            if (doc.exists && doc.data()) {
              console.log("PERSON : FIREBASE");
              commit('SET_CURRENT_PERSON', doc.data().person);
            } else {
              console.log("PERSON : TMDB");
              tmdbApi.getPersonDetails(payload).then(res => {
                const person = res.data
                f.profilePath(person)
                f.knownForDepartment(person)
                f.addPlaceOfDeath(person)
                commit('SET_CURRENT_PERSON', person);
              }).catch(function(error) {
                console.log("Error TMDB :", error)
                if(payload) {
                  commit('SET_CURRENT_PERSON', {id: parseInt(payload), biography: null, birthday: null, deathday: null, profile_path: null, gender: null, known_for_department: [{name: ""}], name: null, place_of_birth: "", place_of_death: ""});
                }
                if(error) {
                  const mess = "Nous n'avons pas trouvé la personnalité demandée"
                  commit('SET_LOADING_ERROR_MESS', mess);
                }
              });      
            }
            state.currentPersonId = payload;
            console.log('data getCurrentPerson loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
            if(error) {
              const mess = "Erreur lors du chargement de la personnalité, essayez de recharger la page ou de réessayer ultérieurement"
              commit('SET_LOADING_ERROR_MESS', mess);
            }
        });  
      }
    },
    getCurrentPersonCredits ({commit,state}, payload) {
      if(!state.currentPersonId||state.currentPersonId!=payload)
      {
        commit('RESET_CURRENT_PERSON_CREDITS');
        db.collection("persons").doc(payload).get()
        .then((doc) => {
            if (doc.exists && doc.data()) {
              console.log("PERSON CREDITS : FIREBASE");
              commit('SET_CURRENT_PERSON_CREDITS', doc.data().personCredits);
            } else {
              console.log("PERSON CREDITS : TMDB");
              tmdbApi.getPersonCredits(payload).then(res => {
                const credits = [...res.data.cast, ...res.data.crew]
                const creditsFormat = f.filmographyFormat(credits)
                commit('SET_CURRENT_PERSON_CREDITS', creditsFormat);
              }).catch(function(error) {console.log("Error TMDB :", error)});      
            }
            state.currentPersonId = payload;
            console.log('data getCurrentPersonCredits loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getCurrentPersonImages ({commit,state}, payload) {
      if(!state.currentPersonId||state.currentPersonId!=payload)
      {
        commit('RESET_CURRENT_PERSON_IMAGES');
        db.collection("persons").doc(payload).get()
        .then((doc) => {
            if (doc.exists && doc.data()) {
              console.log("PERSON IMAGES : FIREBASE");
              commit('SET_CURRENT_PERSON_IMAGES', doc.data().personImages);
            } else {
              console.log("PERSON IMAGES : TMDB");
              tmdbApi.getPersonImages(payload).then(res => {
                if(res.data.profiles) {
                  let imgProfiles = res.data.profiles
                  imgProfiles.forEach(img => { 
                    f.filePath(img)
                  })
                  imgProfiles = f.formatImgForGallery(imgProfiles)
                  commit('SET_CURRENT_PERSON_IMAGES', imgProfiles);
                }
              }).catch(function(error) {console.log("Error TMDB :", error)});      
            }
            state.currentPersonId = payload;
            console.log('data getCurrentPersonImages loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getCurrentPersonDocumented ({commit,state}, payload) {
      if(!state.currentPersonId||state.currentPersonId!=payload)
      {
        commit('RESET_CURRENT_PERSON_DOCUMENTED');
        db.collection("persons").doc(payload).get()
        .then((doc) => {
            if (doc.exists && doc.data().personDocumented) {
              console.log("PERSON_DOCUMENTED");
              commit('SET_CURRENT_PERSON_DOCUMENTED', doc.data().personDocumented);
            } else {
              console.log("PERSON NOT DOCUMENTED");
            }
            state.currentPersonId = payload;
            console.log('data getCurrentPersonDocumented loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
        });  
      }
    },
    getPersons ({commit,state}) {
      if(!state.allPersonsList.length)
      {
        commit('RESET_ALL_PERSONS_LIST');
        commit('RESET_LOADING_ERROR_MESS');
        commit('IS_LOADING_ALL_PERSONS', true);
        db.collection("persons")
        .get()
        .then(function(querySnapshot) {
          commit('IS_LOADING_ALL_PERSONS', false);
          querySnapshot.forEach(function(doc) {
            commit('ADD_PERSON_TO_ALL_PERSONS_LIST', doc.data());
          });
          console.log('data getPersons loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
            if(error) {
              const mess = "Erreur lors du chargement des personnalités, essayez de recharger la page ou de réessayer ultérieurement"
              commit('SET_LOADING_ERROR_MESS', mess);
            }
        });
      }
    },
    getPersonsByFirstLetterLastname ({commit,state}, payload) {
      if(!state.currentPersonsListFirstLetterLastnameSelected||state.currentPersonsListFirstLetterLastnameSelected!=payload)
      {
        commit('RESET_CURRENT_PERSONS_LIST');
        commit('RESET_LOADING_ERROR_MESS');
        commit('IS_LOADING', true);
        db.collection("persons").orderBy("lastname").startAt(payload).endAt(String.fromCharCode(payload.charCodeAt(0) + 1))
        .get()
        .then(function(querySnapshot) {
          commit('IS_LOADING', false);
          querySnapshot.forEach(function(doc) {
            commit('ADD_PERSON_TO_CURRENT_PERSONS_LIST', doc.data());
          });
          state.currentPersonsListFirstLetterLastnameSelected = payload;
          console.log('data currentPersonsListFirstLetterLastnameSelected loaded');  
        }).catch(function(error) {
            console.log("Error firebase:", error);
            if(error) {
              const mess = "Erreur lors du chargement des personnalités, essayez de recharger la page ou de réessayer ultérieurement"
              commit('SET_LOADING_ERROR_MESS', mess);
            }
        });  
      }
    },
  },
  getters: {
    // currentMovie (state) {
    //   return state.currentMovie;
    // }
  }
})
