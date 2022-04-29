<template>
    <div id="vue-应用根">
        <h2>采用 JavaScript 和 Sass 语言</h2>
        <Layout默认></Layout默认>
    </div>
</template>









<script>
import 页面之默认布局 from './页面布局库/默认布局.vue'





export default {
    name: 'App根',

    components: {
        Layout默认: 页面之默认布局,
    },
}
</script>









<style lang="scss">
/* autoprefixer: off */

#vue-应用根 {
    font-family: 'Microsoft YaHei', 'Microsoft YaHei UI', '微软雅黑', 'Segoe UI', 'Lucida Grande', Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    position: relative;
    background-color: #888;

    > h2 {
        z-index: 51;
        font-size: 14px;
        font-weight: normal;
        margin: 0 1.5em;
        padding: 1em;
        line-height: 1.5;
        border-radius: 0 0 0.5em 0.5em;
        display: block;
        text-align: center;
        width: 15em;
        position: absolute;
        right: 0;
        top: 0;
        color: white;
        background-color: black;
    }
}
</style>
