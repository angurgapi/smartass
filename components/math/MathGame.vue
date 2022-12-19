<template>
  <div class="math-grid">
    <MathItem
      v-for="(problem, index) in mathProblems"
      :key="index"
      :problem="problem"
    />
  </div>
</template>

<script>
import MathItem from './MathItem.vue'
export default {
  name: 'MathGame',
  components: { MathItem },
  data: () => ({
    mathProblems: [
      '8 + 2',
      '3 + 3',
      '7-2',
      '11 - 4',
      '18-9',
      '6*6',
      '7 - 7',
      '7 * 9',
      '21+12'
    ]
  })
}
</script>

<style lang="scss">
.math-grid {
  margin-top: 30px;
  overflow: hidden;
  width: 100%;
  height: 90vh;
  border-radius: 8px;
  background-color: #4b93bf;
  display: grid;
  grid-template-columns: repeat(auto-fit, 70px);
  grid-gap: 18px;
  justify-content: center;
}
</style>
