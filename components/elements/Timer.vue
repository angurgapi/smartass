<template>
  <div class="timer f-row">
    <svg-icon name="clock" />
    <span>{{ currentSecond }}s</span>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    stopAt: {
      type: [String, Number],
      required: true
    },
    on: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentSecond: 0,
    timerInterval: null,
    timerTimeout: null
  }),
  watch: {
    on: {
      handler: function (newVal) {
        if (newVal) {
          this.startTimer()
        }
      }
    },
    currentSecond: {
      handler: function (newVal) {
        if (newVal == +this.stopAt) {
          this.stopTimer()
        }
      }
    }
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.currentSecond < +this.stopAt) {
          this.currentSecond++
        }
      }, 1000)
    },

    stopTimer() {
      this.timerInterval = null
      this.$emit('timeout')
    }
  }
}
</script>

<style lang="scss" scoped>
.timer {
  width: 150px;
  border-radius: 5px;
  border: 2px solid #fff;
  padding: 5px;
  line-height: 20px;
  font-size: 20px;
  color: #fff;
  svg {
    height: 20px;
    width: 20px;
    fill: #fff;
    margin-right: 10px;
  }
  span {
    margin-top: 2px;
  }
}
</style>
