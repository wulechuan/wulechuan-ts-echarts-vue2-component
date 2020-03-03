<template>
    <page-with-an-echart></page-with-an-echart>
</template>

<script>
import Vue from 'vue'
import PageWithAnEchart from './views/page-with-an-echart.vue'
export default {
    components: {
        'page-with-an-echart': PageWithAnEchart,
    },
}
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
