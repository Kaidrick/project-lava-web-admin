<template>
  <div class="dashboard-wrapper">
    <el-row :gutter="10">
      <el-col class="block" :span="8">
        <div class="block-content">
          <div id="luaMemTelemetry" ref="luaMem" style="height: 20em"></div>
          <div>
            <div>Request Response Time (Backend to DCS)</div>
            <div>Longest -> which ?</div>
            <div>Shortest -> which ?</div>
            <div>Resource Heavy Request Ranking?</div>
          </div>
        </div>
      </el-col>
      <el-col class="block" :span="8">
        <div class="block-content">
          <img alt="Vue logo" src="../assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
      </el-col>
      <el-col class="block" :span="8">
        <div class="block-content">
          <img alt="Vue logo" src="../assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue';
  import echarts from 'echarts';

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },

    mounted() {
      this.drawLuaMemTelemetry();
    },

    methods: {
      drawLuaMemTelemetry() {
        const chart = echarts.init(this.$refs.luaMem);
        const option = {
          title: {
            text: 'Resource Telemetry',
            textStyle: {
              color: "#ffffff"
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['Mission', 'Hook', 'Export'],
            padding: [40, 10, 80, 10],
            textStyle: {
              color: '#ffffff'
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            top: '12%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['11:58', '11:59', '12:00', '12:01', '12:02', '12:03', '12:04'],
              axisLine: {
                lineStyle: {
                  color: '#ffffff'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                lineStyle: {
                  color: '#ffffff'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#ffffff'
                }
              }
            }
          ],
          series: [
            {
              name: 'Mission',
              type: 'line',
              smooth: true,
              stack: 'Mem',
              areaStyle: {},
              data: [12000, 13200, 10100, 13400, 9000, 23000, 21000]
            },
            {
              name: 'Hook',
              type: 'line',
              smooth: true,
              stack: 'Mem',
              areaStyle: {},
              data: [22000, 18200, 19100, 23400, 29000, 33000, 31000]
            },
            {
              name: 'Export',
              type: 'line',
              smooth: true,
              stack: 'Mem',
              areaStyle: {},
              data: [15000, 23200, 20100, 15400, 19000, 33000, 41000]
            },
          ]
        };

        chart.setOption(option);

        setTimeout(function (){
          window.onresize = function () {
            chart.resize();
          }
        },200)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";

  .dashboard-wrapper {
    background-color: transparent;
    padding: 10px;

    .block {
      .block-content {
        padding: 20px;
        background-color: $primary;
      }
    }
  }
</style>
