<template>
  <div class="page">
    <h1 class="page__title">Simon</h1>
    <p class="page__description">
      Repeat the sequence of buttons <br />
      played by the computer
    </p>
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

<style lang="scss" scoped>
.game {
  padding: 24px;
  max-width: 600px;
  width: 90%;
}
</style>
