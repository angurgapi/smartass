<template>
  <div class="navbar" :class="{ 'navbar--transparent': transparent }">
    <nuxt-link class="navbar__link" to="/">home</nuxt-link>
    <nuxt-link class="navbar__link" to="/games">brain games</nuxt-link>
    <!-- <nuxt-link class="navbar__link" to="/simon">simon</nuxt-link> -->
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 20px;

  &__link {
    font-size: 24px;
    color: #fff;
    letter-spacing: 0.6px;
    margin-right: 20px;
    position: relative;
    padding: 0.2em 0;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.1em;
      background-color: rgba(255, 255, 255, 0.7);
      opacity: 0;
      transition: opacity 300ms, transform 300ms;
    }

    &:hover::after,
    &:focus::after {
      opacity: 1;
      transform: translate3d(0, 0.2em, 0);
    }
  }

  &--transparent {
    .navbar__link {
      color: #202639;
      &::after {
        background-color: #202639;
      }
    }
  }
}
</style>
