<template>
    <div class="dashboard-block-wrapper">
        <div class="block-title">DCS Lua Memory Usage</div>
        <div class="chart" ref="luaMem"></div>
        <div class="block-content">
            <div v-for="(data, index) in telemetryData" :key="index">{{ data }}</div>
            <div>Lava System Dispatcher</div>
            <div>#TaskCount</div>
            <div>Other Data</div>
            <div>#MostResourceHeavyTask</div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import echarts from 'echarts';
    import LuaMemoryUsage from "../../../services/telemetry/LuaMemoryUsage";
    export default {
        name: "Telemetry",

        computed: {
            ...mapGetters('dashboard', ["telemetryData"]),
        },

        methods: {
            ...mapActions('dashboard', ["getLuaStateTelemetry"]),
        },

        data() {
            const option = {
                color: ['#c23531', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                title: {
                    // text: 'Resource Telemetry',
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
                    // padding: [40, 10, 80, 10],
                    textStyle: {
                        color: '#ffffff'
                    }
                },
                // toolbox: {
                //   feature: {
                //     saveAsImage: {}
                //   }
                // },
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
            return {
                timer: null,
                option: option,
            }
        },

        mounted() {
            const chart = echarts.init(this.$refs.luaMem);

            this.timer = setInterval(() => {
                LuaMemoryUsage.getLuaStateTelemetry().then(res => {
                    res.data.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    this.option.xAxis[0].data = res.data.data.map(t => t.timestamp);
                    this.option.series.find(s => s.name === 'Mission').data = res.data.data.map(t => t.missionStateLuaMemory);
                    this.option.series.find(s => s.name === 'Hook').data = res.data.data.map(t => t.hookStateLuaMemory);
                    this.option.series.find(s => s.name === 'Export').data = res.data.data.map(t => t.exportStateLuaMemory);

                    chart.setOption(this.option);
                })
            }, 2000);

            setTimeout(function () {
                window.onresize = function () {
                    chart.resize();
                }
            },200)
        },

        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-block-wrapper {

        .chart {
            margin: 2%;
            height: 75%;
        }
    }
</style>