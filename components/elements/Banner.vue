<template>
  <div class="banner f-col">
    <Brain />
    <div class="banner__content">
      <h1 class="banner__title">Hey smartass!</h1>
      <p class="banner__description">
        Time to exercise your brain <br />and solve some riddles
      </p>
    </div>
  </div>
</template>

<script>
import Brain from '@/components/elements/Brain'

export default {
  name: 'Banner',
  components: { Brain }
}
</script>

<style lang="scss">
.banner {
  font-size: 22px;
  color: #fffade;
  position: relative;
  height: 500px;
  width: 100%;
  overflow: hidden;
  @media (max-width: 800px) {
    font-size: 16px;
  }
  .brain,
  &__content {
    position: absolute;
  }
  &__title {
    margin-top: 0;
  }

  &__description {
    font-size: 1.4em;
  }
  .brain {
    top: 20px;
    @media (max-width: 800px) {
      width: 400%;
    }
  }

  &__content {
    top: 120px;
    text-align: center;
  }
}
</style>
