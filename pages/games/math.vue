<template>
  <div class="page">
    <h1 class="page__title">Speed math</h1>
    <span class="page__description">
      Calculate the results of math expressions while you can see them
    </span>
    <MathGame />
  </div>
</template>

<script>
import MathGame from '@/components/math/MathGame'
export default {
  name: 'SpeedMath',
  components: { MathGame }
}
</script>
