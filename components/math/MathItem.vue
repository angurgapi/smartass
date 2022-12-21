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
  height: 80px;
  border-radius: 50%;
  transition: opacity 0.5s ease-in-out;
  animation: glow 1s ease-in-out infinite alternate;
  user-select: none;

  &:nth-child(2n) {
    animation-delay: 40ms;
    @media (min-width: 800px) {
      transform: translateY(180px);
    }
  }

  &:nth-child(4n) {
    animation-delay: 2ms;
    @media (min-width: 800px) {
      transform: translateY(125px);
    }
  }
}
@keyframes glow {
  from {
    box-shadow: 2px 0px 50px 10px rgba(237, 241, 244, 0.34);
    background: #fffae3;
  }
  to {
    box-shadow: 2px 0px 50px 10px rgba(237, 241, 244, 0.58);
    background: #fff;
  }
}
</style>
