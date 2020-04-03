import Vue from 'vue'
import App from '@/views/app.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#vue2-app-placeholder')
