<template>
    <div id="vue-应用根">
        <h2>采用 TypeScript 和 Stylus 语言</h2>
        <Layout默认></Layout默认>
    </div>
</template>









<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 页面之默认布局 from './页面布局库/默认布局.vue'





@Component({
    components: {
        Layout默认: 页面之默认布局,
    },
})
export default class App根 extends Vue {}
</script>









<style lang="stylus">
/* autoprefixer: off */

#vue-应用根 {
    font-family 'Microsoft YaHei', 'Microsoft YaHei UI', '微软雅黑', 'Segoe UI', 'Lucida Grande', Helvetica, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    display flex
    flex-direction column
    height 100%
    overflow auto
    background-color #888

    > h2 {
        z-index 51
        font-size 14px
        font-weight normal
        margin 0 1.5em
        padding 1em
        line-height 1.5
        border-radius 0 0 0.5em 0.5em
        display block
        text-align center
        width 15em
        position absolute
        right 0
        top 0
        color white
        background-color black
    }
}
</style>
