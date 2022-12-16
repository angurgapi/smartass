<template>
  <div class="page">
    <h1 class="page__title">Simon</h1>
    <span class="page__description"
      >Repeat the sequence of buttons <br />
      played by the computer</span
    >
    <div class="game card">
      <SimonGame />
    </div>
  </div>
</template>

<script>
import SimonGame from '@/components/simon/SimonGame.vue'
export default {
  name: 'Game',
  components: {
    SimonGame
  }
}
</script>

<style lang="scss">
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
  &__value,
  &__speed {
    margin-top: 18px;
  }
}
</style>
