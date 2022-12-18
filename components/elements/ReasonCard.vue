<template>
  <div class="reason-card card" :class="{ invisible: isInvisible }">
    <div class="reason-card__icon">
      <img :src="`/landing/${card.icon}.png`" />
    </div>
    <div class="reason-card__content" v-html="card.content" />
  </div>
</template>

<script>
export default {
  name: 'ReasonCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    isInvisible: true,
    observer: null
  }),
  methods: {
    observeScroll() {
      const target = this.$el
      const options = {
        threshold: 0.3
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isInvisible = false
          }
          //   else {
          //     this.isInvisible = true
          //   }
        })
      }, options)
      this.observer.observe(this.$el)
    }
  },
  mounted() {
    this.observeScroll()
  }
}
</script>

<style lang="scss">
.reason-card {
  display: flex;
  padding: 20px;
  user-select: none;
  align-items: center;
  transition: 0.3s all ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  &:not(:first-child) {
    margin-top: 18px;
  }

  @media (max-width: 800px) {
    font-size: 18px;
    line-height: 19px;
  }
  @media (max-width: 500px) {
    font-size: 16px;
    line-height: 17px;
  }
  &__icon {
    display: flex;
    flex-shrink: 0;
    height: 60px;
    width: 60px;
    margin-right: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.details {
  font-size: 1rem;
  margin-top: 10px;
  opacity: 0.8;
  text-align: justify;
  transform: translateY(0);
}
.invisible {
  opacity: 0;
  transform: translateY(20px);
}
</style>
