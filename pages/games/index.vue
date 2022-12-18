<template>
  <div class="page">
    <h2 class="page__title">Brain games</h2>
    <div class="games-grid">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script>
import GameCard from '@/components/elements/GameCard'

export default {
  name: 'BrainGames',
  components: { GameCard },
  data: () => ({
    games: [
      {
        id: 1,
        title: 'Pairs',
        description:
          "Memorise the cards' positions and find a match for each card",
        image: 'pairs',
        url: 'pairs'
      },
      {
        id: 2,
        title: 'Simon',
        description: 'Reproduce the random sequence of light & sound signals',
        image: 'simon',
        url: 'simon'
      },
      {
        id: 3,
        title: 'Word list',
        description: 'Reproduced as many words from the list as you remember',
        url: 'wordlist',
        image: 'wordlist'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.page {
  background: #fffade;
}
.games-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 18px;
}
</style>
