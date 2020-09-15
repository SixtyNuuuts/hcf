export default {

    jobsTranslation: [
      {
        job: "Director",
        jobTranslatationM: "Réalisateur",
        jobTranslatationF: "Réalisatrice",
        order: 1
      },
      {
        job: "Writer",
        jobTranslatationM: "Scénariste",
        jobTranslatationF: "Scénariste",
        order: 2
      },
      {
        job: "Scenario Writer",
        jobTranslatationM: "Scénariste",
        jobTranslatationF: "Scénariste",
        order: 2
      },
      {
        job: "Screenplay",
        jobTranslatationM: "Scénariste",
        jobTranslatationF: "Scénariste",
        order: 2
      },
      {
        job: "Assistant Director",
        jobTranslatationM: "Assistant Réalisateur",
        jobTranslatationF: "Assistant Réalisatrice",
        order: 3
      },
      {
        job: "Producer",
        jobTranslatationM: "Producteur",
        jobTranslatationF: "Productrice",
        order: 3
      },
      {
        job: "Novel",
        jobTranslatationM: "Roman",
        jobTranslatationF: "Roman",
        order: 3
      },
      {
        job: "Editor",
        jobTranslatationM: "Monteur",
        jobTranslatationF: "Monteuse",
        order: 4
      },
      {
        job: "Music",
        jobTranslatationM: "Musique",
        jobTranslatationF: "Musique",
        order: 4
      },
      {
        job: "Sound",
        jobTranslatationM: "Son",
        jobTranslatationF: "Son",
        order: 4
      },
      {
        job: "Production Design",
        jobTranslatationM: "Chef décorateur",
        jobTranslatationF: "Chef décoratrice",
        order: 4
      },
      {
        job: "Set Decoration",
        jobTranslatationM: "Décorateur",
        jobTranslatationF: "Décoratrice",
        order: 4
      },
      {
        job: "Director of Photography",
        jobTranslatationM: "Directeur de la photographie",
        jobTranslatationF: "Directrice de la photographie",
        order: 4
      },
      {
        job: "Still Photographer",
        jobTranslatationM: "Photographe",
        jobTranslatationF: "Photographe",
        order: 4
      },
      {
        job: "Conductor",
        jobTranslatationM: "Chef d'orchestre",
        jobTranslatationF: "Chef d'orchestre",
        order: 4
      },
      {
        job: "Original Music Composer",
        jobTranslatationM: "Compositeur de la B.O.",
        jobTranslatationF: "Compositrice de la B.O.",
        order: 4
      },
      {
        job: "Adaptation",
        jobTranslatationM: "Adaptation",
        jobTranslatationF: "Adaptation",
        order: 4
      },
      {
        job: "Acting",
        jobTranslatationM: "Acteur",
        jobTranslatationF: "Actrice",
        order: 5
      },
      {
        job: "Writing",
        jobTranslatationM: "Scénariste",
        jobTranslatationF: "Scénariste",
        order: 5
      },
      {
        job: "Directing",
        jobTranslatationM: "Réalisateur",
        jobTranslatationF: "Réalisatrice",
        order: 5
      },
    ],

    movieCrewFormat(crew) {
        const movieCrewFormat = []
        crew.forEach(person => {
          let personJob = person.job
          let personPriority = 5;
          let jobIsInArray = this.jobsTranslation.find(p => p.job == personJob);
          if (jobIsInArray) {
            personJob = jobIsInArray.jobTranslatationM;
            if (person.gender == 1) {
              personJob = jobIsInArray.jobTranslatationF;
            }
            personPriority = jobIsInArray.order;
          }
          let personIsInArray = movieCrewFormat.find(p => p.id == person.id);
          if (!personIsInArray) {
            movieCrewFormat.push({
              id: person.id,
              name: person.name,
              profile_path: person.profile_path,
              gender: person.gender,
              jobs: [{ name: personJob }],
              order: personPriority,
            });
          } else {
            personIsInArray.jobs = [
              ...personIsInArray.jobs,
              { name: personJob }
            ];
            if (personIsInArray.order > personPriority) {
              personIsInArray.order = personPriority;
            }
          }
        });
        return movieCrewFormat;
    },
    
    filmographyFormat(credits) {
      const movieCreditsFormat = []
      credits.forEach(movie => {
        this.posterPath(movie)

        let jobIsInArray = this.jobsTranslation.find(p => p.job == movie.job);
        if (jobIsInArray) {
          movie.job = jobIsInArray.jobTranslatationM;
          if (movie.gender == 1) {
            movie.job = jobIsInArray.jobTranslatationF;
          }
        }

        let movieIsInArray = movieCreditsFormat.find(m => m.id == movie.id);
        if (!movieIsInArray) {
            if (movie.job) {
              movie.job = [{ name: movie.job }];
            } else { movie.job = [] }
            if (movie.character) {
              movie.character = [{ name: movie.character }];
            } else { movie.character = [] }
            if (!movie.release_date) {
              if(movie.first_air_date) {
                movie.release_date = movie.first_air_date;
              } else {
                movie.release_date = "2021-01-01";
              }
            }
            movieCreditsFormat.push(movie);
        } else {
          if (movie.job) {
            if (!movieIsInArray.job) {
              movie.job = [{ name: movie.job }];
            } else {
              movieIsInArray.job.push({name: movie.job});
            }
          } else { movie.job = [] }
          if (movie.character) {
            if(!movieIsInArray.character) {
              movie.character = [{ name: movie.character }];
            } else {
              movieIsInArray.character.push({ name: movie.character });
            }
          } else { movie.character = [] }
        }
      });
      return movieCreditsFormat;
    },

    backdropPath(movie) {
        let backdropPath = null;
        if (movie.backdrop_path) {
            backdropPath =
            "https://image.tmdb.org/t/p/original" + movie.backdrop_path;
        } else {
            backdropPath = require("../assets/img/backdrop_default.jpg");
        }
        movie.backdrop_path = backdropPath;
    },

    posterPath(movie) {
        let posterPath = null;
        if (movie.poster_path) {
            posterPath = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
        }
        movie.poster_path = posterPath;
    },

    filePath(movie) {
      let filePath = null;
      if (movie.file_path) {
        filePath = "https://image.tmdb.org/t/p/original" + movie.file_path;
      }
      movie.file_path = filePath;
    },

    profilePath(person) {
        let profilePath = null;
        if (person.profile_path) {
            profilePath = "https://image.tmdb.org/t/p/w300" + person.profile_path;
        }
        person.profile_path = profilePath;
    },

    knownForDepartment(person) {

      let personJob = [{ name: person.known_for_department }];
      let jobIsInArray = this.jobsTranslation.find(p => p.job == personJob);
      if (jobIsInArray) {
        personJob = [{ name: jobIsInArray.jobTranslatationM }];
        if (person.gender == 1) {
          personJob = [{ name: jobIsInArray.jobTranslatationF }];
        }
      }
      person.known_for_department = personJob;

    },

    addPlaceOfDeath(person) {
      person.place_of_death = "";
    },

    formatImgForGallery(arrayOfImg){
      return arrayOfImg.map(e => e = { src: e.file_path, msrc: e.file_path, alt: '', title: '', w: e.width, h: e.height })
    },

    sortedByOrder(array) {
      array.sort(function(a, b) {
        return a.order - b.order
      })
      return array
    },

    sortedByDate(array) {
      array.sort(function(a, b) {
        return new Date(a.release_date) - new Date(b.release_date);
      })
      return array
    },

    sortedByAlphabet(array) {
      array.sort(function(a, b) {
        return a.original_title.localeCompare(b.original_title)
      })
      return array
    },

    sortedByAlphabetPerson(array) {
      array.sort(function(a, b) {
        return a.lastname.localeCompare(b.lastname)
      })
      return array
    },

    sortedByAlphabetJobs(array) {
      array.sort(function(a, b) {
        return a.localeCompare(b)
      })
      return array
    },

}