<template>
<section id="movies">
    <vue-headful title="Les Films | Cinéma Français d'Autrefois" description="Les Films du Cinéma Français d'Autrefois" />
    <div v-if="isUserLogged">
        <div class="title">
            <div>
                <h1>LES FILMS DOCUMENTÉS <span v-if="isAdmin">({{ documentedMovieListByYear.length }})</span></h1>
                <h2>par année</h2>
                <ul class="years first-line">
                    <li v-for="year in yearsFirstLine" :key="year" @click="handleYearSelected(year)" :class="{ 'active': year === selectedYear }">
                        {{ year }}
                    </li>
                </ul>
                <ul class="years second-line">
                    <li v-for="year in yearsSecondLine" :key="year" @click="handleYearSelected(year)" :class="{ 'active': year === selectedYear }">
                    {{ year }}
                    </li>
                </ul>
                <ul class="years third-line">
                    <li v-for="year in yearsThirdLine" :key="year" @click="handleYearSelected(year)" :class="{ 'active': year === selectedYear }">
                    {{ year }}
                    </li>
                </ul> 
            </div>
        </div>
        <div class="search" v-click-outside="hide">
            <el-input type="search" ref="searchInput" placeholder="Recherche par titre" v-model="search" @input="querySearchMovie" @keyup.enter.native="inputSearchBlur()"></el-input>
            <ul class="search-movie-result" :class="{ 'show': search, 'is-loading': isLoading }">
                <li v-for="(movie, index) in searchMovieResultFilteredByYear" :key="index">
                    <router-link v-if="movie.original_title && movie.release_date" :to="'/film/' + movie.id">
                        <div class="poster">
                            <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path">
                            <div v-else class="no-poster">
                                <i class="el-icon-picture"></i>
                            </div>
                        </div>
                        <div class="title-year" v-if="movie.release_date"><strong v-if="movie.original_title">{{ movie.original_title }}</strong> <span v-if="movie.release_date" class="year">({{ movie.release_date | dateParse('YYYY-MM-DD') | dateFormat('YYYY') }})</span></div>
                    </router-link>
                </li>
            </ul>
        </div>
        <MoviesDocuList :movies="documentedMovieListByYear" />
        <MoviesList :movies="movieListByYear" :year="selectedYear" />
    </div>
    <div v-else>
        <LoginUser/>
    </div>
</section>
</template>

<script>
import MoviesDocuList from "@/components/Movies/MoviesDocuList.vue"
import MoviesList from "@/components/Movies/MoviesList.vue"
import f from "@/services/func";
import tmdbApi from "@/services/tmdb-api";
import ClickOutside from 'vue-click-outside'
import LoginUser from "@/components/LoginUser.vue";

export default {
    created() {
        this.getStoreData(this.isUserLogged);
    },
    data() {
        return {
            yearsFirstLine: [1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939],
            yearsSecondLine: [1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949],
            yearsThirdLine: [1950, 1951, 1952, 1953, 1954],
            selectedYear: this.$store.state.currentYearSelected,
            search: '',
            searchMovieResult: [],
            isLoading: false
        }
    },
    directives: {
        ClickOutside
    },
    watch: {
        isUserLogged(newValue) {
            this.getStoreData(newValue);
        }
    },
    methods: {
        inputSearchBlur() {
            this.querySearchMovie(this.search);
            this.$refs.searchInput.$el.getElementsByTagName('input')[0].blur();
        },
        querySearchMovie(queryString) {
            this.searchMovieResult = [];
            this.isLoading = true;
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                tmdbApi.searchMovie(queryString, 1).then(res => {
                    let searchMovieResult = []
                    // let pageLimit = 5
                    // if (res.data.total_pages < 5) {
                    //     pageLimit = res.data.total_pages
                    // }
                    for (let page = 1; page <= res.data.total_pages; page++) {
                        tmdbApi.searchMovie(queryString, page).then(res => {
                            searchMovieResult = [...searchMovieResult, ...res.data.results]
                            if (page === res.data.total_pages) {
                                this.isLoading = false;
                                this.searchMovieResult = searchMovieResult;
                            }
                        })
                    }
                    if (!res.data.results.length) {
                        this.isLoading = false;
                    }
                })
            }, 600)
        },
        hide() {
            this.search = ''
        },
        handleYearSelected(year) {
            this.selectedYear = year;
            this.$store.commit('SET_CURRENT_YEAR_SELECTED', year)
            this.$store.dispatch("getMoviesByYear", year)
            this.$store.dispatch("getDocumentedMoviesByYear", year)
        },
        getStoreData(isUserLogged) {
            if (isUserLogged) {
                this.$store.dispatch("getMoviesByYear", this.selectedYear)
                this.$store.dispatch("getDocumentedMoviesByYear", this.selectedYear)
            }
        }
    },
    computed: {
        movieListByYear() {
            let currentMovieListByDocufiltered = this.$store.state.currentMovieListByYear.filter(m => !this.documentedMovieListByYear.find(e => e.id === m.id));
            let currentMovieListByYearfiltered = currentMovieListByDocufiltered.filter(m => m.release_date.split('-')[0] === this.selectedYear.toString()).filter(m => m.original_title !== 'Untel père et fils');            
            return f.sortedByAlphabet(currentMovieListByYearfiltered);
        },
        documentedMovieListByYear() {
            let currentDocumentedMovieListByYearfiltered = f.sortedByAlphabet(this.$store.state.currentDocumentedMovieListByYear);
            return currentDocumentedMovieListByYearfiltered;
        },
        searchMovieResultFilteredByYear() {
            return f.sortedByDate(this.searchMovieResult.filter(m => m.release_date && m.release_date.split('-')[0] >= '1930' && m.release_date.split('-')[0] <= '1960').filter(m => m.original_language == 'fr'));
        },
        isAdmin() {
            return this.$store.state.currentUser.admin;
        },
        isUserLogged() {
            return this.$store.state.currentUser.loggedIn;
        },
    },
    name: "Movies",
    components: {
        MoviesList,
        MoviesDocuList,
        LoginUser,
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/shadow.scss';
@import '@/styles/bp.scss';

#movies {
    padding: 4em 1.45em 0 1.5em;

    .search {
        position: relative;
        margin: 0 1.3rem;
        margin-top: 2rem;

        .search-movie-result {
            position: absolute;
            z-index: 2000;
            width: 100%;
            max-height: 15rem;
            overflow: auto;
            visibility: hidden;
            max-height: 0;
            display: flex;
            flex-direction: column;
            box-shadow: $--box-shadow-brown-4;
            background: #fff4e3;

            &.is-loading {
                background: url('../assets/img/loader-Spin-1s-74px.gif') no-repeat center #f5e3c6;
                box-shadow: $--box-shadow-brown-4;
                background-size: 30px;
                min-height: 4rem;
            }

            &.show {
                visibility: visible;
                max-height: 17rem;
            }

            li {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                &:not(:last-child) {
                    border-bottom: 1px solid rgba(192, 163, 124, 0.5)
                }

                a {
                    color: $--color-hcf-dark-brown;
                    font-weight: 600;
                    display: block;
                    transition: .2s ease;
                    padding: .8rem;
                    font-size: 1em;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all .2s;

                    &:hover {
                        color: $--color-hcf-red;
                        background-color: rgba(172, 148, 111, 0.05);
                    }

                    .poster {
                        width: 25px;
                        min-width: 25px;
                        transition: all .3s;
                        margin-right: 0.9rem;

                        img {
                            width: 100%;
                            box-shadow: $--box-shadow-dark-1;
                        }

                        .no-poster {
                            background-color: $--color-hcf-black;
                            width: 25px;
                            min-width: 25px;
                            height: 37.5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            box-shadow: $--box-shadow-dark-1;

                            i {
                                font-size: .8rem;
                                color: #ffffff45;
                            }

                        }

                    }

                    .title-year {
                        // flex-shrink: 1;

                        .year {
                            color: #887050;
                            margin-left: .2rem;
                        }

                    }

                }

            }

        }
    }

    .title {
        padding: 3em 3.6em;
        position: relative;
        text-align: center;
        z-index: 2;
        background: url("../assets/img/box-border-patern.png") repeat 0 0 $--color-hcf-beige;
        font-family: "Righteous";
        line-height: 1.2;

        &:before {
            background: $--color-hcf-light-beige;
            bottom: 0;
            content: "";
            display: block;
            left: 0;
            margin: 1.5em;
            position: absolute;
            right: 0;
            top: 0;
            z-index: -1;
        }

        h1 {
            color: $--color-hcf-ddark-brown;
            margin: 0.5em;
            margin-top: 0.2em;
            text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
            font-size: 1.9rem;
        }

        h2 {
            font-weight: 500;
            color: #d7c6af;
            font-size: 1.3rem;
            margin: 0;
            margin-bottom: 0.4rem;
        }

        ul.years {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            // border-top: 1px solid $--color-hcf-red;
            // border-bottom: 1px solid $--color-hcf-red;
            margin: .2rem 0px;

            li {
                color: $--color-hcf-red;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.3rem 0.6rem;
                border-radius: 3px;
                // background-color: $--color-hcf-light-beige;
                font-size: 1.45rem;
                // margin: .2rem .05rem;
                margin-left: .40rem;
                margin-right: .40rem;
                    // margin-top: .2rem;
                    // margin-bottom: .2rem;
                transition: background-color .3s, color .3s, margin-left .3s, margin-right .3s;
                cursor: pointer;

                &:hover,
                &.active {
                    color: $--color-hcf-light-beige;
                    background-color: $--color-hcf-red;
                    box-shadow: $--box-shadow-brown-2;
                }

                &.active {
                    // margin: .3rem .3rem .3rem .43rem;
                    // margin-left: .43rem;
                    // margin-right: .3rem;
                    // margin-top: .3rem;
                    // margin-bottom: .3rem;
                }
            }

            &.second-line {
                li {
                    margin-left: .37rem;
                    margin-right: .37rem;
                }
            }
        }

    }

}

@media (max-width: 400px) {
    #movies {

        .title {
            padding: 2.5em;

            h1 {
                font-size: 1.7rem;
            }
        }
    }
}

@media (max-width: 500px) {
    #movies {
        .search {
            .search-movie-result {
                li {
                    a {
                        font-size: .8em;

                        .poster {
                            width: 15px;
                            min-width: 15px;

                            .no-poster {
                                min-width: 15px;
                                width: 15px;
                                height: 25px;

                                i {
                                    font-size: .5rem;
                                }

                            }

                        }

                        .title-year {
                            flex-shrink: 0;
                        }

                    }

                }

            }
        }

    }
}
</style>
