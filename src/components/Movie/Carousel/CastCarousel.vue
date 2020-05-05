<template>
    <div class="cast-carousel-wrapper">
        <div v-if="movieCast.length > nbElemVisib" class="cast-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
        <div class="cast-carousel" :style="{ width: withContainer }">
            <div class="cast-carousel--overflow-container">
                <div class="cast-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')' }">
                    <a v-for="actor in movieCast" :key="actor.id" class="card" href="">
                      <div class="picture">
                        <img v-if="actor.profile_path" :src="'https://image.tmdb.org/t/p/w138_and_h175_face' + actor.profile_path">
                        <div v-else class="no-picture">
                          <i class="el-icon-user-solid"></i>
                        </div>
                      </div>
                      <div class="text">
                        <h1>{{ actor.name }}</h1>
                        <p class="character">{{ actor.character }}</p>
                      </div>
                    </a>
                </div>
            </div>
        </div>
        <div v-if="movieCast.length > nbElemVisib" class="cast-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
</template>

<script>

export default {
  name: "CastCarousel",
  data() {
    return {
      currentOffset: 0,
      nbElemVisib: 6,
      cardWidth: 110,
      cardMargin: 10,
      cardBorder: 10
    }
  },
  props: {
    movieCast: Array
  },
  computed: {
    paginationFactor() { return this.cardWidth + this.cardMargin * 2 + this.cardBorder * 2 },
    withContainer() {
        let withContainer;
        if (this.movieCast.length < this.nbElemVisib) {
            withContainer = ( this.cardWidth * this.movieCast.length ) + ( this.cardBorder * ( this.movieCast.length * 2 ) ) + ( this.cardMargin * ( this.movieCast.length * 2 ) ) + 'px';
        } else {
            withContainer = ( this.cardWidth * this.nbElemVisib ) + ( this.cardBorder * ( this.nbElemVisib * 2 ) ) + ( this.cardMargin * ( this.nbElemVisib * 2 ) ) + 'px';
        }
        
      return withContainer;
    },
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.movieCast.length - this.nbElemVisib);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
  }
};
</script>

<style scoped lang="scss">

$card-width: 110px;
$card-margin: 10px;
$card-border: 10px;
$nb-elem-visib: 6;

.cast-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cast-carousel {
  display: flex;
  justify-content: center;

  &--overflow-container {
    overflow: hidden;
  }
  
  &--nav__left,
  &--nav__right {
    display: inline-block;
    position: absolute;
    width: 15px;
    height: 15px;
    padding: 5px;
    box-sizing: border-box;
    border-top: 2px solid #4e2d06;
    border-right: 2px solid #4e2d06;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.1;
      border-color: rgb(58, 32, 7);
    }
  }
  
  &--nav__left {
    transform: rotate(-135deg);
    left: -33px;
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }
  
  &--nav__right {
    transform: rotate(45deg);
    right: -33px;
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.cast-carousel-cards {
    display: flex;
    transition: transform 150ms ease-out;
    transform: translatex(0px);

    .card {
      margin: 10px #{$card-margin};
      min-width: #{$card-width};
      width: #{$card-width};
      background-color: #fff;
      margin-right: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      border: #{$card-border} solid white;
      
      .picture {
        width: 100%;
        height: 125px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightgrey;

        img {
          width: 100%;
        }

        .no-picture {
          width: 100%;
          height: 100%;
          background-color: lightgrey;
          display: flex;
          justify-content: center;
          align-items: center;

          i {
            font-size: 5rem;
            color: #b5b5b5;
          }
        }

      }

      .text {
        padding: 0.05em;
        margin-top: 0.7em;
        color: #000;
        max-height: 55px;
        overflow: auto;
        text-align: left;
        
        h1 {
          margin: 0;
          font-size: 1em;
          line-height: 1.1;
        }

        p {
          font-size: 0.8em;
          margin: 0;
          margin-top: 3px;
        }

      }

    }

}

</style>
