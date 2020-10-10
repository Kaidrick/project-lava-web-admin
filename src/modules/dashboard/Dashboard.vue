<template>
    <div class="dashboard-wrapper">
        <el-row :gutter="10">
            <el-col class="block" :span="8">
                <div class="block-content">
                    <Telemetry></Telemetry>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Telemetry from "./components/Telemetry";
    export default {
        name: "Dashboard",
        components: {Telemetry}
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