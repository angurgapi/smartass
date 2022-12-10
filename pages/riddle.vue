<template>
  <div class="page">
    <div class="game">
      <div :key="restartKey" class="game__grid">
        <Tile
          v-for="(img, index) in shuffledImagesArray"
          :key="index"
          :img="img"
          :revealed="isImageVisible(index)"
          :nailed="nailedImages.includes(index)"
          @click="checkFlip(index)"
        />
      </div>
      <div class="game__footer">
        <p class="game__counter">Attempt № {{ attemptNumber }}</p>
        <button class="game__button" @click="restartGame">Start again</button>
        <p class="game__counter">Found pairs {{ nailedImages.length / 2 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from '@/components/Tile'

export default {
  name: 'RiddlePage',
  components: { Tile },
  layout: 'default',

  data: () => ({
    images: [
      'Almond_blossoms',
      'Bowl_with_Daisies',
      'Evening_landscape',
      'Field_with_green_wheat',
      'Irises',
      'Irises_II',
      'Oleanders',
      'Olive_grove',
      'Olive_trees',
      'Orchard_with_cypresses',
      'Ravine',
      'Resting_at_noon',
      'Roses',
      'Starry_night',
      'The_Langlois_bridge_at_Arles',
      'Wheat_Field_with_Cypresses',
      'Wild_roses',
      'Bedroom'
    ],
    currentAttempt: [],
    nailedImages: [],
    attemptNumber: 1,
    shuffledImagesArray: [],
    restartKey: false,
    flipTimeout: null
  }),

  methods: {
    checkFlip(idx) {
      //BEGINNING OF A NEW ATTEMPT
      this.flipTimeout = null

      if (!this.currentAttempt.length) {
        //todo: before timeout click
        this.nextAttempt()
        this.currentAttempt.push(idx)
        return
      } else if (this.currentAttempt.length === 1) {
        if (this.currentAttempt[0] !== idx) {
          this.currentAttempt.push(idx)
          let firstImg = this.currentAttempt[0],
            secondImg = this.currentAttempt[1]
          //IF TWO CARDS MATCH
          if (
            this.shuffledImagesArray[firstImg] ==
            this.shuffledImagesArray[secondImg]
          ) {
            this.nailedImages.push(firstImg, secondImg)
            localStorage.setItem('nailedPicsArray', this.nailedImages)
            this.nextAttempt()
          } else {
            //IF CARDS DO NOT MATCH, END ATTEMPT
            this.flipTimeout = setTimeout(() => {
              this.hideAttemptCards(this.attemptNumber)
            }, 5000)
          }
        }
        return
      }
      if (this.currentAttempt.length === 2) {
        this.nextAttempt()
        this.currentAttempt.push(idx)
      }
    },
    nextAttempt() {
      this.currentAttempt = []
      this.attemptNumber++
      localStorage.setItem('attemptNumber', this.attemptNumber)
    },
    hideAttemptCards(attemptNum) {
      if (this.attemptNumber == attemptNum) {
        this.nextAttempt()
      }
    },
    isImageVisible(idx) {
      return (
        this.nailedImages.includes(idx) || this.currentAttempt.includes(idx)
      )
    },
    getImagesArray() {
      if (localStorage.getItem('totalPicsArray')) {
        this.shuffledImagesArray = localStorage
          .getItem('totalPicsArray')
          .split(',')
      } else {
        this.shuffledImagesArray = [...this.images, ...this.images].sort(
          (a, b) => 0.5 - Math.random()
        )
        localStorage.setItem('totalPicsArray', this.shuffledImagesArray)
      }
    },
    restartGame() {
      console.log('user would like to restart')
      localStorage.removeItem('totalPicsArray')
      localStorage.removeItem('nailedPicsArray')
      localStorage.removeItem('attemptNumber')
      this.restartKey = !this.restartKey
      this.getImagesArray()
      this.nailedImages = []
      this.attemptNumber = 1
    }
  },
  mounted() {
    this.getImagesArray()
    this.nailedImages =
      localStorage
        .getItem('nailedPicsArray')
        ?.split(',')
        .map((idx) => {
          return +idx
        }) || []
    this.attemptNumber = localStorage.getItem('attemptNumber') || 1
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.game {
  height: 100%;
  width: 95vw;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  padding: 10px;
  &__grid {
    display: grid;
    grid-gap: 18px;
    // height: 95vh;
    justify-content: center;
    grid-template-columns: repeat(9, 1fr);
    // grid-template-rows:repeat( auto-fit, minmax(100px, 150px) );
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__counter {
    font-size: 22px;
    font-weight: 600;
  }
  &__button {
    height: 42px;
    border: none;
    background-color: rgba(43, 85, 128, 0.7);
    border-radius: 6px;
    padding: 0 15px;
    color: #ffffff;
    font-size: 20px;
    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
