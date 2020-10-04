<template>
<section id="persons">
    <div class="title">
        <div>
            <h1>LES PERSONNALITÉS DOCUMENTÉES <span v-if="isAdmin">({{ personsFiltered.length }})({{ allPersons.length }})</span></h1>
            <h2>par ordre alphabétique</h2>
            <ul class="alphabet">
                <!-- <li @click="handleLetterSelected()" :class="{ 'active': !selectedLetter }">TOUS</li>-->
                <li v-for="letter in letters" :key="letter" @click="handleLetterSelected(letter)" :class="{ 'active': letter === selectedLetter && !search }">
                    {{ letter }}
                </li>
            </ul>
        </div>
    </div>
    <div v-if="loadingErrorMess" class="error-mess"> <img src="@/assets/img/404-error-brown.svg" alt="Logo Error 404" /> {{ loadingErrorMess }}</div>

    <div class="search">
        <!-- <div class="search" v-click-outside="hide">-->
        <el-input placeholder="Recherche par nom / prénom" v-model="search"></el-input>
        <ul class="search-person-result" :class="{ 'show': search, 'is-loading': isLoadingAllPersons }">
        </ul>
        <!-- <el-input placeholder="Recherche par nom / prénom" v-model="search" @input="querySearchPerson"></el-input>
        <ul class="search-person-result" :class="{ 'show': search, 'is-loading': isLoading }">
            <li v-for="(person, index) in searchPersonResultFilteredByKnownForDepartment" :key="index">
                <router-link v-if="person.name && person.known_for_department" :to="'/person/' + person.id">
                    <div class="picture">
                        <img v-if="person.profile_path" :src="'https://image.tmdb.org/t/p/w200' + person.profile_path">
                        <div v-else class="no-picture">
                            <img v-if="person.gender == 1" src="@/assets/img/p-female.svg" />
                            <img v-else src="@/assets/img/p-male.svg" />
                        </div>
                    </div>
                    <div class="name-kfd"><strong v-if="person.name">{{ person.name }}</strong><span v-if="person.known_for_department" class="kfd">({{ person.known_for_department }})</span></div>
                </router-link>
            </li>
        </ul>-->
    </div>

    <div v-if="personsFiltered.length && !search && !loadingErrorMess" class="filters">
        <h3>Filtres :</h3>
        <el-radio-group v-model="filter">
            <el-radio label="all">Tous</el-radio>
            <el-radio v-for="(job, index) in JobsList" :key="index" :label="job.name">{{ job.name }}</el-radio>
        </el-radio-group>
    </div>
    <PersonsList :persons="personsFiltered" />
</section>
</template>

<script>
import PersonsList from "@/components/Persons/PersonsList.vue"
import f from "../services/func";
// import tmdbApi from "@/services/tmdb-api";
// import ClickOutside from 'vue-click-outside'

export default {
    created() {
        this.$store.dispatch("getPersonsByFirstLetterLastname", this.selectedLetter);
    },
    data() {
        return {
            letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
            selectedLetter: this.$store.state.currentFirstLetterSelected,
            filter: 'all',
            search: '',
            searchQueryGetAllPersonsLaunched: false,
            // isLoading: false
            // searchPersonResult: [],
        }
    },
    // directives: {
    //     ClickOutside
    // },
    methods: {
        getAllPerons() {
            // clearTimeout(this.debounce)
            // this.debounce = setTimeout(() => {
            if (!this.searchQueryGetAllPersonsLaunched) {
                if (!this.$store.state.allPersonsList.length) {
                    this.searchQueryGetAllPersonsLaunched = true;
                    this.$store.dispatch("getPersons");
                }
            }
            // }, 500)
        },
        // querySearchPerson(queryString) {
        //     this.searchPersonResult = [];
        //     this.isLoading = true;
        //     clearTimeout(this.debounce)
        //     this.debounce = setTimeout(() => {
        //         tmdbApi.searchPerson(queryString, 1).then(res => {
        //             let searchPersonResult = []
        //             // let pageLimit = 5
        //             // if (res.data.total_pages < 5) {
        //             //     pageLimit = res.data.total_pages
        //             // }
        //             for (let page = 1; page <= res.data.total_pages; page++) {
        //                 tmdbApi.searchPerson(queryString, page).then(res => {
        //                     searchPersonResult = [...searchPersonResult, ...res.data.results]
        //                     if (page === res.data.total_pages) {
        //                         this.isLoading = false;
        //                         this.searchPersonResult = searchPersonResult;
        //                     }
        //                 })
        //             }
        //             if (!res.data.results.length) {
        //                 this.isLoading = false;
        //             }
        //         })
        //     }, 600)
        // },
        // hide() {
        //     this.search = ''
        // },
        handleLetterSelected(letter) {
            this.selectedLetter = letter;
            this.filter = 'all';
            this.search = '';
            this.$store.commit('SET_CURRENT_FIRST_LETTER_SELECTED', letter)
            this.$store.dispatch("getPersonsByFirstLetterLastname", letter)
        }
    },
    computed: {
        personsFiltered() {
            // if (this.selectedLetter) {
            //     return f.sortedByAlphabetPerson(this.$store.state.currentPersonsList.filter(p => p.lastname.charAt(0) === this.selectedLetter));
            // }
            if (this.filter !== 'all') {
                return f.sortedByAlphabetPerson(this.$store.state.currentPersonsList.filter(p => p.person.known_for_department.some((e) => e.name.substring(0, 3) === this.filter.substring(0, 3))));
            }
            if (this.search) {
                this.getAllPerons();
                return f.sortedByAlphabetPerson(this.$store.state.allPersonsList.filter(p => p.person.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(this.search.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
            }
            return f.sortedByAlphabetPerson(this.$store.state.currentPersonsList);
        },
        allPersons() {
            return this.$store.state.allPersonsList;
        },
        isAdmin() {
            return this.$store.state.currentUser.admin;
        },
        isLoadingAllPersons() {
            return this.$store.state.isLoadingAllPersons;
        },
        loadingErrorMess() {
            return this.$store.state.loadingErrorMess;
        },
        JobsList() {
            return f.sortedByOrder(f.genJobsFiltersList(this.$store.state.currentPersonsList));
        },
        // searchPersonResultFilteredByKnownForDepartment() {
        //     return f.sortedByKFOriginalLangFr(this.searchPersonResult.filter(p => p.known_for.some((m) => m.release_date >= '1930' && m.release_date <= '2000')));
        //     // return f.sortedByKFOriginalLangFr(this.searchPersonResult.filter(p => p.known_for.some((m) => m.release_date >= '1930' && m.release_date <= '1980')).reduce((unique, item) => (unique.find(p => p.id === item.id) ? unique : [...unique, item]), []));
        // },
    },
    name: "Persons",
    components: {
        PersonsList,
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/color.scss';
@import '@/styles/shadow.scss';
@import '@/styles/bp.scss';

#persons {
    padding: 4em 1.45em 2em 1.5em;
    min-height: 550px;

    .title {
        padding: 3.2em 3.6em;
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

        ul.alphabet {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            li {
                // &:first-child {
                //     margin: .4rem 50% !important;
                //     min-width: 4rem;
                // }

                color: $--color-hcf-red;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.1rem 0.45rem;
                border-radius: 3px;
                background-color: $--color-hcf-light-beige;
                font-size: 1.45rem;
                // margin: .2rem .05rem;
                margin-left: 0.07rem;
                margin-right: .07rem;
                margin-top: 0.4rem;
                margin-bottom: 0.2rem;
                transition: background-color .3s,
                    color .3s,
                    margin-left .3s,
                    margin-right .3s;
                cursor: pointer;

                &:hover,
                &.active {
                    color: $--color-hcf-light-beige;
                    background-color: $--color-hcf-red;
                    box-shadow: $--box-shadow-brown-2;
                }

                &.active {
                    // margin: .3rem .3rem .3rem .43rem;
                    margin-left: .43rem;
                    margin-right: .3rem;
                    margin-top: .3rem;
                    margin-bottom: .3rem;
                }
            }
        }

    }

    .search {
        position: relative;
        margin: 0 1.3rem;
        margin-top: 2rem;
        margin-bottom: 1.5rem;

        .search-person-result {
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

                    .picture {
                        width: 25px;
                        min-width: 25px;
                        transition: all .3s;
                        margin-right: 0.9rem;

                        img {
                            width: 100%;
                            box-shadow: $--box-shadow-dark-1;
                        }

                        .no-picture {
                            background-color: $--color-hcf-black;
                            width: 25px;
                            min-width: 25px;
                            height: 37.5px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            box-shadow: $--box-shadow-dark-1;

                            img {
                                width: 100%;
                            }

                        }

                    }

                    .name-kfd {
                        // flex-shrink: 1;

                        .kfd {
                            color: #887050;
                            margin-left: .2rem;
                        }

                    }

                }

            }

        }
    }

    .error-mess {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 14rem;
        font-size: 1.2em;
        max-width: 37rem;
        margin: auto;
        margin-top: 1rem;

        img {
            width: 3rem;
            margin-bottom: 1rem;
        }
    }

    .filters {
        margin: 0 1rem;
        margin-bottom: 0.5rem;

        .el-radio-group {
            line-height: 1.5rem;
        }

        h3 {
            font-size: 0.9rem;
            margin: .9rem 0;
        }
    }

}

@media (max-width: 400px) {
    #persons {
        .title {
            padding: 2.5em;

            h1 {
                font-size: 1.7rem;
            }
        }
    }
}

@media (min-width: $--bp-sm) {
    .filters {
        margin: 0 1.5rem;
        margin-bottom: 0.5rem;
    }
}
</style>
