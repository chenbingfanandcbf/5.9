<template>
  <div>
    <div id="myChart" style="width: 100%; height: 100vh"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getreportsApi } from "@/utis/api";
export default {
    data() {
        return {

        };
    },
    async mounted() {
        const res=await getreportsApi()
        console.log(res);
        let myChart = echarts.init(document.getElementById('myChart'))
        myChart.setOption(res)
    },
    methods: {

    },
};
</script>

<style scoped>
#myChart{
  width: 100%;
}
</style>
