<template>
    <page-with-an-echart></page-with-an-echart>
</template>

<script>
import Vue from 'vue'

import PageWithAnEchartOfCompactSource from '@/views/pages/page-with-an-echart--compact-echart-source.vue'

export default {
    components: {
        'page-with-an-echart': PageWithAnEchartOfCompactSource,
    },
}
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
