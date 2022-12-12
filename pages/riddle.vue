<template>
  <div class="page">
    <div class="game">
      <div :key="restartKey" class="game__grid">
        <Tile
          v-for="(img, index) in shuffledImagesArray"
          :key="index"
          :img="img"
          :revealed="currentAttemptCards.includes(index)"
          :nailed="nailedImages.includes(index)"
          @click="checkFlip(index)"
        />
      </div>
      <div class="game__footer">
        <div class="game__footer game__footer--left">
          <p class="game__counter">Attempt № {{ currentAttemptNum }}</p>
          <span class="game__timer">{{ currentSecond }}s</span>
          <p class="game__counter">
            Found pairs: {{ nailedImages.length / 2 }}
          </p>
        </div>
        <div class="game__footer game__footer--right">
          <button class="game__button" @click="restartGame">Restart</button>
        </div>
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
    currentAttemptCards: [],
    currentAttemptNum: 1,
    currentSecond: 0,
    nailedImages: [],
    shuffledImagesArray: [],
    restartKey: false,
    flipTimeout: null,
    timerInterval: null,
    timerTimeout: null
  }),

  watch: {
    currentSecond(newVal) {
      if (newVal === 5) {
        this.killTimer()
        this.nextAttempt()
      }
    },

    nailedImages(newVal) {
      if (newVal.length == this.shuffledImagesArray.length) {
        alert('congrats you won')
        this.restartGame()
      }
    }
  },

  methods: {
    checkFlip(idx) {
      //BEGINNING OF A NEW ATTEMPT
      if (!this.currentAttemptCards.length) {
        this.currentAttemptCards.push(idx)
        return
      }
      //THIS IS THE 2D CARD OF AN ATTEMPT & it is not a second click on the same card
      if (
        this.currentAttemptCards.length === 1 &&
        this.currentAttemptCards[0] !== idx
      ) {
        console.log('user has picked the second card')
        this.currentAttemptCards.push(idx)
        let firstImg = this.currentAttemptCards[0],
          secondImg = this.currentAttemptCards[1]
        //IF TWO CARDS MATCH
        if (
          this.shuffledImagesArray[firstImg] ==
          this.shuffledImagesArray[secondImg]
        ) {
          this.nailedImages.push(firstImg, secondImg)
          localStorage.setItem('nailedPicsArray', this.nailedImages)
        } else {
          console.log('check of both cards resulted in mismatch')
          //IF CARDS DO NOT MATCH, END ATTEMPT in 5s
          this.startTimer()
        }
        return
      }
      //NEW ATTEMPT INITIATED BY USER, NOT TIMER, PREV NOT CLEARED YET
      else if (this.currentAttemptCards.length === 2) {
        this.killTimer()
        this.nextAttempt()
        this.currentAttemptCards.push(idx)
      }
    },

    nextAttempt() {
      this.currentAttemptCards = []
      this.currentAttemptNum++
      localStorage.setItem('attemptNumber', this.attemptNumber)
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.currentSecond < 5) {
          this.currentSecond++
        }
      }, 1000)
    },

    killTimer() {
      this.currentSecond = 0
      clearInterval(this.timerInterval)
    },

    isImageVisible(idx) {
      return (
        this.nailedImages.includes(idx) ||
        this.currentAttemptCards.includes(idx)
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
      this.killTimer()
      localStorage.removeItem('totalPicsArray')
      localStorage.removeItem('nailedPicsArray')
      localStorage.removeItem('attemptNumber')
      this.restartKey = !this.restartKey
      this.getImagesArray()
      this.nailedImages = []
      this.currentAttemptCards = []
      this.currentAttemptNum = 1
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
    this.currentAttemptNum = localStorage.getItem('attemptNumber') || 1
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
    justify-content: center;
    grid-template-columns: repeat(9, 1fr);
    @media (max-width: 1000px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__counter,
  &__timer {
    font-size: 22px;
    font-weight: 600;
  }

  &__timer {
    margin: 0 20px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #000;
  }
  &__button {
    height: 46px;
    border: none;
    background-color: rgba(245, 206, 66, 0.7);
    border-radius: 6px;
    padding: 0 18px;
    color: #43435c;
    font-weight: 600;
    font-size: 24px;
    text-transform: capitalize;
    box-shadow: 4px 4px 8px -1px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: scale(1.02);
      box-shadow: 4px 4px 8px 3px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
