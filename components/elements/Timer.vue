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
      default: null
    },
    on: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentSecond: 0,
    timerInterval: null
  }),
  watch: {
    on: {
      handler: function (newVal) {
        if (newVal) {
          this.startTimer()
        } else {
          this.stopTimer()
        }
      }
    },
    currentSecond: {
      handler: function (newVal) {
        if (this.stopAt && newVal == +this.stopAt) {
          this.stopTimer()
        }
      }
    }
  },
  methods: {
    startTimer() {
      this.currentSecond = 0
      this.timerInterval = setInterval(() => {
        // if (this.currentSecond < +this.stopAt && this.on) {
        //   this.currentSecond++
        // }
        this.currentSecond++
      }, 1000)
    },

    stopTimer() {
      clearInterval(this.timerInterval)
      this.$emit('timeout')
      this.$emit('report', this.currentSecond)
    }
  }
}
</script>
