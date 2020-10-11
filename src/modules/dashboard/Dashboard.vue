<template>
    <div class="dashboard-wrapper">
        <el-row :gutter="10">
            <el-col class="block" :span="8">
                <div class="block-content">
                    <Telemetry></Telemetry>
                </div>
            </el-col>
            <el-col class="block" :span="16">
                <div class="block-content">
                    <PlayerList></PlayerList>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col class="block" :span="8">
                <div class="block-content">
                    <h2>Operation</h2>
                    <div>Broadcast</div>
                    <el-input type="textarea"></el-input>
                    <div>Controls</div>
                    <el-button>Restart</el-button>
                    <el-button>Stop</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Telemetry from "./components/Telemetry";
    import PlayerList from "./components/PlayerList";
    export default {
        name: "Dashboard",
        components: {PlayerList, Telemetry}
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/style/color-scheme";

    .el-row {
        margin-bottom: 20px;
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