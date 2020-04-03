<template>
    <page-with-an-echart></page-with-an-echart>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import PageWithAnEchartOfCompactSource from '@/views/pages/page-with-an-echart--compact-echart-source.vue'

@Component({
    components: {
        'page-with-an-echart': PageWithAnEchartOfCompactSource,
    },
})
export default class App extends Vue {}
</script>

<style lang="stylus">
body {
    margin 0
    background-color #999
}

html, body {
    height 100%
}
</style>
