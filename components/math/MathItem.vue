<template>
  <div class="math-item f-col">
    <span>{{ problem }}</span>
  </div>
</template>

<script>
export default {
  name: 'MathItem',
  props: {
    problem: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.math-item {
  background: #fff;
  height: 70px;
  border-radius: 50%;
  &:nth-child(odd) {
    transform: translateY(50px);
  }
}
</style>
