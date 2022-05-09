import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";
import Moment from "moment";
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.filter("rank", function (v) {
  return moment(v * 1000).format("YYYY-MM-DD-SS hh:mm:ss");
});
Vue.filter("ran", function (v) {
  return moment(v * 1000).format("YYYY/MM/D hh:mm:ss ");
});
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
