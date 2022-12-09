<template>
  <div class="page">
    <div class="game">
      <div class="game__grid">
        <Tile
          v-for="(img, index) in getImagesArray"
          :key="index"
          :img="img"
          :revealed="isImageVisible(index)"
          :nailed="nailedImages.includes(index)"
          @click="revealImage(index)"
        />
      </div>
      <p class="game__counter">Attempt № {{ attemptNumber }}</p>
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
      'Wild_roses'
    ],
    currentAttempt: [],
    // lastRevealedTile: null,
    nailedImages: [],
    attemptNumber: 1
  }),

  computed: {
    getImagesArray() {
      return [...this.images, ...this.images].sort(
        (a, b) => 0.5 - Math.random()
      )
    }
  },

  methods: {
    revealImage(idx) {
      console.log(this.getImagesArray[idx])
      if (!this.currentAttempt.length) {
        this.currentAttempt.push(idx)
        return
      } else if (this.currentAttempt.length === 1) {
        if (this.currentAttempt[0] !== idx) {
          this.currentAttempt.push(idx)
          let firstImg = this.currentAttempt[0],
            secondImg = this.currentAttempt[1]
          if (
            this.getImagesArray[firstImg] === this.getImagesArray[secondImg]
          ) {
            this.nailedImages.push(firstImg, secondImg)
          }
        }
        return
      }
      if (this.currentAttempt.length === 2) {
        this.currentAttempt = []
        this.attemptNumber++
        this.currentAttempt.push(idx)
      }
    },
    isImageVisible(idx) {
      return (
        this.nailedImages.includes(idx) || this.currentAttempt.includes(idx)
      )
    }
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
    // grid-template-rows:repeat( auto-fit, minmax(100px, 150px) );
  }

  &__counter {
    font-size: 22px;
    font-weight: 600;
  }
}
</style>
