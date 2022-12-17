<template>
  <div class="wrapper">
    <div class="wrapper__banner">
      <NavBar />
      <Banner />
    </div>
    <div class="wrapper__content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Banner from '@/components/elements/Banner'

export default {
  components: { NavBar, Banner }
}
</script>

<style lang="scss">
.wrapper {
  height: 100%;
  min-height: 100vh;
  background: #fffade;
  &__banner {
    background-image: linear-gradient(
      to right,
      #12002e,
      #120130,
      #120131,
      #110233,
      #110335,
      #170d3f,
      #1f134a,
      #281a55,
      #3b296d,
      #4f3a85,
      #634a9f,
      #785cb9
    );
    &:before {
      content: '';
      height: 100px;
      width: 100%;
      transform: skew(10deg);
    }
  }
}
</style>
