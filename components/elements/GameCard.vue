<template>
  <nuxt-link :to="`/games/${game.url}`" class="game-card card">
    <div
      class="game-card__cover"
      :style="`background-image: url(${getImgUrl});`"
    />
    <div class="game-card__body f-col">
      <p class="game-card__title">{{ game.title }}</p>
      <span class="game-card__description">{{ game.description }}</span>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    getImgUrl() {
      return `/games/${this.game.image}.png` || 'placeholder.webp'
    }
  }
}
</script>

<style lang="scss" scoped>
.game-card {
  width: 250px;
  display: flex;
  flex-direction: column;
  min-height: 250px;
  &__cover {
    width: 100%;
    height: 50%;
    min-height: 125px;
    background-size: cover;
    background-size: contain;
    background-position: center;
    border-radius: 8px 8px 0 0;
  }
  &__body {
    padding: 20px;
    align-items: flex-start;
    color: #12002e;
  }
  &__title {
    font-size: 20px;
    margin: 10px 0 10px 0;
    font-weight: 600;
  }
  &__description {
    font-size: 16px;
  }
}
</style>
