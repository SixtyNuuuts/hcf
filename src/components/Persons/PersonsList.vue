<template>
  <div>
    <div class="filters">
      <h3>Filtres :</h3>
      <el-radio-group v-model="filter">
        <el-radio label="all">Tous</el-radio>
        <el-radio v-for="(job, index) in JobsList" :key="index" :label="job">{{ job }}</el-radio>
      </el-radio-group>
    </div>
    <section id="persons-list" :class="{'is-loading' : isLoading}">
      <router-link
        v-for="(item, index) in personsFiltered"
        :to="'/person/' + item.person.id"
        :key="index"
        class="card"
      >
        <div class="picture">
          <img v-if="item.person.profile_path" :src="item.person.profile_path" />
          <div v-else class="no-picture">
            <img v-if="item.person.gender == 1" src="@/assets/img/p-female.svg" />
            <img v-else src="@/assets/img/p-male.svg" />
          </div>
        </div>
        <div class="text">
          <h1>{{ item.person.name }}</h1>
          <p class="character">{{ item.person.known_for_department }}</p>
        </div>
      </router-link>
    </section>
  </div>
</template>

<script>
import f from "../../services/func";

export default {
  name: "PersonsList",
  props: {
    persons: Array,
  },
  data() {
    return {
      filter: 'all'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    JobsList() {
      return f.sortedByAlphabetJobs(this.$store.state.currentJobsListinPersonsList);
    },
    personsFiltered() {
      if(this.filter === 'all') {
        return this.persons;
      }
      return this.persons.filter(p => p.person.known_for_department.substring(0, 3) === this.filter.substring(0, 3));
    },
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/color.scss";
@import "@/styles/bp.scss";
@import "@/styles/shadow.scss";

.filters {
  margin-top: 1rem;

  h3 {
    display: inline-block;
    font-size: 0.9rem;
    margin-right: 2rem;
  }
}

#persons-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: .3rem;
  min-height: 19.6rem;
  
  &.is-loading {
    background: url('../../assets/img/loader-Spin-1s-74px.gif') no-repeat center;
    min-height: 12rem;
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
      background-color: $--color-hcf-light-grey;

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

      p {
        font-size: 0.85em;
        margin: 0;
        margin-top: 0.25em;
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
