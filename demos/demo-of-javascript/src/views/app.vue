<template>
    <page-with-an-echart></page-with-an-echart>
</template>

<script>
import Vue from 'vue'

import PageWithAnEchart from '@/views/pages/page-with-an-echart.vue'

export default {
    components: {
        'page-with-an-echart': PageWithAnEchart,
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
