<template>
    <div class="页面布局-默认布局">
        <header class="应用总导航栏">
            <App总导航></App总导航>
        </header>

        <div class="页面布局之主体">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>









<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 应用总导航 from './布局专用部件库/应用总导航.vue'





@Component({
    components: {
        App总导航: 应用总导航,
    },
})
export default class Layout默认 extends Vue {}
</script>









<style lang="stylus">
/* autoprefixer: off */

.页面布局-默认布局 {
    display flex
    flex-direction column
    overflow hidden
    height 100%

    > .应用总导航栏 {
        flex 0 0 auto
    }

    > .页面布局之主体 {
        flex 1 1 auto
        display flex
        flex-direction column
        overflow auto
    }
}
</style>
