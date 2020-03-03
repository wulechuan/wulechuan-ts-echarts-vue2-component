<template>
    <page-with-an-echart></page-with-an-echart>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import PageWithAnEchart from './views/page-with-an-echart.vue'

@Component({
    components: {
        'page-with-an-echart': PageWithAnEchart,
    },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
html, body {
    height 100%
}

body {
    margin 0
    background-color #999
}
</style>
