<template>
  <div class="landing page">
    <div class="page__content f-col">
      <div class="landing__content">
        <h2>Why even bother?</h2>
        <div class="landing__reasons">
          <ReasonCard
            v-for="(reason, index) in reasons"
            :key="index"
            class="landing__reason"
            :card="reason"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReasonCard from '../components/elements/ReasonCard.vue'

export default {
  name: 'IndexPage',
  components: { ReasonCard },
  layout: 'index',
  data: () => ({
    reasons: [
      {
        icon: 'memory',
        content:
          'Do you ocasionally catch yourself <span class="highlighted">forgetting things</span>?<br/><span class="details">Memory training is the best pill there is.</span>'
      },
      {
        icon: 'anxiety',
        content:
          '<span class="highlighted">Fight anxiety</span><br/><span class="details">A fit mind is more likely to win over desctructive thoughts.</span>'
      },
      {
        icon: 'decision',
        content:
          'Faster <span class="highlighted">decision-making</span><br/><span class="details">Navigate through life and perform better as a professional.</span>'
      },
      {
        icon: 'brain',
        content:
          'Build more <span class="highlighted">neural pathways</span><br/><span class="details">Reduce the risk of dementia, make your future easier.</span>'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.wrapper {
  background: #fff !important;
}
.landing {
  &__content {
    margin-top: 20px;
    color: #12002e;
  }
}
</style>
