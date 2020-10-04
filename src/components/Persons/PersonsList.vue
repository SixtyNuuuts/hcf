<template>
<div>
    <section id="persons-list" :class="{'is-loading' : isLoading}">
        <router-link v-for="(item, index) in persons" :to="'/person/' + item.person.id" :key="index" class="card">
            <div class="picture">
                <img v-if="item.person.profile_path" :src="item.person.profile_path" />
                <div v-else class="no-picture">
                    <img v-if="item.person.gender == 1" src="@/assets/img/p-female.svg" />
                    <img v-else src="@/assets/img/p-male.svg" />
                </div>
            </div>
            <div class="text">
                <h1>{{ item.person.name }}</h1>
                <div class="jobs">
                    <span v-for="(job, index) in item.person.known_for_department" :key="index" class="job">{{ job.name }}</span>
                </div>
            </div>
        </router-link>
    </section>
</div>
</template>

<script>
export default {
    name: "PersonsList",
    props: {
        persons: Array,
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/color.scss";
@import "@/styles/bp.scss";
@import "@/styles/shadow.scss";

#persons-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    // padding-top: .3rem;

    &.is-loading {
        background: url('../../assets/img/loader-Spin-1s-74px.gif') no-repeat center;
        min-height: 20rem;
    }

    .card {
        display: flex;
        flex-direction: column;
        padding: 0.8em;
        background-color: $--color-hcf-black;
        box-shadow: $--box-shadow-2;
        margin: 1em;
        transition: 0.2s ease;
        position: relative;
        top: 0;
        width: 100%;

        &:hover {
            box-shadow: $--box-shadow-4;
            top: -0.2em;
        }

        .picture {
            width: 100%;
            height: 13em;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $--color-hcf-black;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .no-picture {
                width: 100%;
                height: 100%;
                background-color: $--color-hcf-light-grey;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 110%;
                    position: relative;
                }
            }
        }

        .text {
            padding: 0.05em;
            margin-top: 0.7em;
            color: $--color-hcf-light-beige;
            text-align: left;
            line-height: 1.05;
            letter-spacing: 0.02rem;

            h1 {
                margin: 0;
                color: white;
                font-size: 1.05em;
            }

            .jobs {
                display: flex;
                flex-wrap: wrap;

                .job {
                    font-size: 0.85em;
                    margin: 0;
                    margin-top: 0.25em;

                    &:not(:last-child) {
                        margin-right: .3rem;

                        &:after {
                            content: ",";
                            position: relative;
                            right: 0.15
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: $--bp-sm) {
    #persons-list {
        .card {
            width: 38%;
        }

    }
}

@media (min-width: $--bp-md) {
    #persons-list {
        .card {
            width: 25%;
        }

    }
}

@media (min-width: $--bp-lg) {
    #persons-list {
        .card {
            width: 18%;
        }

    }
}
</style>
