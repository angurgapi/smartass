<template>
  <div class="math-game">
    <Timer :on="isTimerOn" @report="reportSeconds" />
    <div class="math-game__grid">
      <MathItem
        v-for="(problem, index) in problemsInViewPort"
        :key="index"
        :problem="problem"
      />
    </div>
    <div class="game__controls">
      <input
        v-if="!gameOver"
        v-model="currentGuess"
        type="number"
        class="game__input"
      />
      <button v-else class="btn btn--primary" @click="startGame">
        Restart
      </button>
    </div>
    <OverlayModal v-if="isModalVisible" @close="isModalVisible = false">
      <template #content>
        <div class="game__modal">
          Congratulations! You nailed all the
          {{ mathProblems.length }} expressions in {{ getGameTime }}
        </div>
      </template>
    </OverlayModal>
  </div>
</template>

<script>
import MathItem from './MathItem.vue'
import OverlayModal from '../elements/OverlayModal.vue'
export default {
  name: 'MathGame',
  components: { MathItem, OverlayModal },
  data: () => ({
    currentGuess: null,
    isTimerOn: false,
    gameOver: false,
    isModalVisible: false,
    solvedExpressions: 0,
    timerSeconds: 0,
    mathProblems: [
      '8 + 2',
      '3 + 3',
      '7 - 2',
      '11 - 4',
      '18 - 9',
      '6 * 6',
      '7 - 7',
      '7 * 9',
      '21 + 12',
      '2 * 18',
      '1 + 10',
      '27 / 3',
      '9 * 1',
      '10 - 5',
      '11 - 7',
      '2 * 4',
      '5 - 4',
      '8 * 9',
      '10 - 7',
      '9 * 4',
      '6 + 1',
      '10 - 3'
    ],
    problemsInViewPort: [],
    remainingProblems: []
  }),

  computed: {
    getGameTime() {
      let minutes = ~~(this.timerSeconds / 60)
      let seconds = this.timerSeconds % 60
      return minutes ? `${minutes} min ${seconds} sec` : `${seconds} sec`
    }
  },

  watch: {
    currentGuess: {
      handler: function (newVal) {
        if (newVal !== null) {
          this.checkTry(newVal)
        }
      }
    },
    solvedExpressions: {
      handler: function (newVal) {
        if (newVal == this.mathProblems.length) {
          this.gameOver = true
          this.isModalVisible = true
          this.isTimerOn = false
        }
      }
    }
  },

  methods: {
    calcString(str) {
      return str.length ? Function(`'use strict'; return (${str})`)() : null
    },
    checkTry(result) {
      let currentEquasion = this.problemsInViewPort.find(
        (expr) => expr.length && this.calcString(expr) == result
      )
      //array contains expression resulting with the arg
      if (currentEquasion) {
        this.solvedExpressions++
        let idx = this.problemsInViewPort.indexOf(currentEquasion)
        let nodeToReplace = document.querySelectorAll('.math-item')[idx]
        nodeToReplace.classList.add('disappear')

        setTimeout(() => {
          if (this.remainingProblems.length) {
            nodeToReplace.classList.remove('disappear')
            this.problemsInViewPort[idx] = this.remainingProblems.shift()
          } else {
            //out of problems in the list
            this.problemsInViewPort[idx] = ''
          }
          this.currentGuess = null
        }, 500)
      }
    },
    reportSeconds(sec) {
      this.timerSeconds = sec
    },
    startGame() {
      document
        .querySelectorAll('.math-item')
        .forEach((node) => node.classList.remove('disappear'))
      this.problemsInViewPort = this.mathProblems
        .slice(0, 8)
        .sort((a, b) => 0.5 - Math.random())
      this.remainingProblems = this.mathProblems.slice(8)
      this.gameOver = false
      this.isTimerOn = true
    }
  },
  mounted() {
    this.startGame()
  }
}
</script>

<style lang="scss" scoped>
.math-game {
  margin-top: 30px;
  overflow: hidden;
  width: 100%;
  height: 90vh;
  border-radius: 8px;
  position: relative;
  background-color: #4b93bf;

  &__grid {
    display: grid;
    position: absolute;
    top: 200px;
    grid-template-columns: repeat(auto-fit, 80px);
    grid-gap: 18px;
    justify-content: center;
    width: 100%;
    @media (max-width: 800px) {
      grid-template-columns: repeat(4, 80px);
    }
    @media (max-width: 500px) {
      grid-template-columns: repeat(3, 80px);
      .math-item:nth-child(3n) {
        transform: translateY(50px);
      }
    }
  }
  .timer {
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .game__controls {
    position: absolute;
    bottom: 20px;
  }
}
.disappear {
  opacity: 0;
}
</style>
