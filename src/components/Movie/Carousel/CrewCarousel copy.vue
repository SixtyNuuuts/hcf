<template>
    <div class="crew-carousel-wrapper">
        <div class="crew-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
        <div class="crew-carousel">
            <div class="crew-carousel--overflow-container">
                <div class="crew-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')' }">
                    <div v-for="person in movieCrewFormat" :key="person[0]" class="person">
                        <a href="" class="picture">
                        <img v-if="person[4]" :src="'https://image.tmdb.org/t/p/w138_and_h175_face' + person[4]">
                        <div v-else class="no-picture">
                            <i class="el-icon-user-solid"></i>
                        </div>
                        </a>
                        <h4 class="name"><a href="">{{ person[2] }}</a></h4>
                        <ul class="jobs">
                        <li v-for="job in person[1]" :key="job">{{ job }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="crew-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
</template>

<script>

export default {
  name: "CrewCarousel",
  data() {
    return {
      currentOffset: 0,
      nbElemVisib: 4,
      paginationFactor: 110
    }
  },
  props: {
    movieCrewFormat: Array
  },
  computed: {
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.movieCrewFormat.length - this.nbElemVisib);
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

$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f8;

$card-width: 90px;
$card-margin: 10px;
$nb-elem-visib: 4;
$wrapper-width: calc(( #{$card-width} * #{$nb-elem-visib} ) + ( #{$card-margin} * ( #{$nb-elem-visib} * 2 - 2 )));

// ( #{$card-width} * #{$nb-elem-visib} ) + ( #{$card-margin} * ( #{$nb-elem-visib} * 2 ) - 2 )

.crew-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
//   margin: 20px 0 40px;
}

.crew-carousel {
  display: flex;
  justify-content: center;
  width: #{$wrapper-width};

  &--overflow-container {
    overflow: hidden;
  }
  
  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }
  
  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }
  
  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.crew-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

    .person {
        margin: 0 #{$card-margin};
        min-width: #{$card-width};
        display: flex;
        flex-direction: column;
        align-items: center;

        .picture {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            overflow: hidden;
            border-radius: 50%;
            border: 3px solid #f8f0e0;
            background-color: #d3d3d3;

            img {
            width: 100%;
            }

            i {
            color: #b5b5b5;
            font-size: 1.9em;
            }

        }

        h4 {
            margin: 0.3em 0;
            text-align: center;
            line-height: 1.2;

            a {
            color: #f8f0e0;
            }

        }

        ul {
            margin: 0;
            text-align: center;
            padding: 0;
            font-size: 0.9em;
            line-height: 1.2;
        }

    }

 
//   .crew-carousel--card {
//     margin: 0 #{$card-margin};
//     min-width: #{$card-width};
//     cursor: pointer;
//     box-shadow: 0 4px 15px 0 rgba(40,44,53,.06), 0 2px 2px 0 rgba(40,44,53,.08);
//     background-color: #fff;
//     border-radius: 4px;
//     z-index: 3;
//     margin-bottom: 2px;
    
//     &:first-child {
//       margin-left: 0;
//     }
    
//     &:last-child {
//       margin-right: 0;
//     }

//     // img {
//     //   vertical-align: bottom;
//     //   border-top-left-radius: 4px;
//     //   border-top-right-radius: 4px;
//     //   transition: opacity 150ms linear;
//     //   user-select: none;
      
//     //   &:hover {
//     //     opacity: 0.5;
//     //   }
//     // }
    
//   }

}

</style>
