import Vue from 'vue'
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

// Vue.use(VTooltip)
Vue.component('v-popover', VPopover)
Vue.directive('close-popover', VClosePopover)
Vue.directive('tooltip', VTooltip)
