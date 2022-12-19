<template>
  <div class="page">
    <h1 class="page__title">Pairs</h1>
    <span class="page__description"
      >Find a match for every Van Gogh's painting</span
    >
    <div class="game card">
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

          <div class="game__timer f-row">
            <svg-icon name="clock" />
            <span>{{ currentSecond }}s</span>
          </div>
          <p class="game__counter">
            Found pairs: {{ nailedImages.length / 2 }}
          </p>
        </div>
        <div class="game__footer game__footer--right">
          <button class="btn game__button" @click="restartGame">Restart</button>
        </div>
      </div>
    </div>
    <OverlayModal v-if="isModalVisible" @close="isModalVisible = false">
      <template #content>
        <div class="modal-content">Congratulations! You nailed it!</div>
      </template>
    </OverlayModal>
  </div>
</template>

<script>
import Tile from '@/components/pairs/Tile'
import OverlayModal from '@/components/elements/OverlayModal.vue'

export default {
  name: 'PairsPage',
  components: { Tile, OverlayModal },
  layout: 'default',

  data: () => ({
    isModalVisible: false,
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
        this.isModalVisible = true
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
    console.log(localStorage.getItem('attemptNumber'))
    this.currentAttemptNum = +localStorage.getItem('attemptNumber') || 1
  },
  beforeDestroy() {
    this.restartGame()
  }
}
</script>

<style scoped lang="scss">
.game {
  height: 100%;
  width: 100%;

  &__grid {
    display: grid;
    grid-gap: 14px;
    justify-content: center;
    grid-template-columns: repeat(9, 1fr);
    @media (max-width: 1000px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    &--left,
    &--right {
      width: fit-content;
    }
    @media (max-width: 800px) {
      flex-direction: column;
    }
  }

  &__counter,
  &__timer {
    font-size: 22px;
    font-weight: 600;
  }

  &__timer {
    margin: 0 20px;
    width: 80px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #000;
    line-height: 22px;
    svg {
      height: 22px;
      width: 22px;
      fill: red;
    }

    span {
      margin-left: 10px;
      padding-top: 5px;
    }
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
