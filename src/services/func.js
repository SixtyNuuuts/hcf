export default {

    movieCrewFormat(crew) {
        const movieCrewFormat = []
        const jobsTranslation = [
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
            jobTranslatationM: "Compositeur de la bande originale",
            jobTranslatationF: "Compositrice de la bande originale",
            order: 4
          },
          {
            job: "Adaptation",
            jobTranslatationM: "Adaptation",
            jobTranslatationF: "Adaptation",
            order: 4
          }
        ];
        crew.forEach(person => {
          let personJob = person.job
          let personPriority = 5;
          let jobIsInArray = jobsTranslation.find(p => p.job == personJob);
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

    profilePath(person) {
        let profilePath = null;
        if (person.profile_path) {
            profilePath = "https://image.tmdb.org/t/p/w138_and_h175_face" + person.profile_path;
        }
        person.profile_path = profilePath;
    },

    sortedByOrder(array) {
      array.sort(function(a, b) {
        return a.order  - b.order
      })
      return array
    },

    sortedByAlphabet(array) {
      array.sort(function(a, b) {
        return a.original_title.localeCompare(b.original_title)
      })
      return array
    },


}