<template>
    <div class="dashboard-wrapper">
        <el-row :gutter="10">
            <el-col class="block" :span="8">
                <div class="block-content">
                    <telemetry></telemetry>
                </div>
            </el-col>
            <el-col class="block" :span="16">
                <div class="block-content">
                    <player-list></player-list>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col class="block" :span="8">
                <div class="block-content">
                    <operation></operation>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Telemetry from "./components/Telemetry";
    import PlayerList from "./components/PlayerList";
    import Operation from "@/modules/dashboard/components/Operation";
    export default {
        name: "Dashboard",
        components: {Operation, PlayerList, Telemetry}
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/style/color-scheme";

    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }

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