<template>
  <div class="lua-console-wrapper">
    <el-row>
      <el-col :span="18">
        <el-collapse v-model="activeName">
          <el-collapse-item title="Server Log" name="1">
            <log-panel/>
          </el-collapse-item>
          <el-collapse-item title="Lua Debug Console" name="2">
            <el-col :span="18">
              <div>
                <el-input class="lua-debug-string-text-area"
                          type="textarea"
                          v-model="luaDebugString"
                          placeholder="Enter Lua code to be executed in selected environment here."></el-input>
                <el-input class="lua-debug-return-string-text-area" type="textarea" v-model="currentResult"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="env-select-radio-group-wrapper">
                <div class="env-select-radio-title-wrapper">
                  <span class="env-select-radio-title">Debug Lua State</span>
                </div>
                <el-radio-group v-model="debugEnvironment">
                  <div class="env-select-radio-button-box">
                    <div>
                      <el-tooltip class="item" effect="light" content="Execute in Mission Scripting Engine" placement="right">
                        <el-radio :label="0" border>Mission</el-radio>
                      </el-tooltip>
                    </div>
                    <div>
                      <el-tooltip class="item" effect="light" content="Execute in Net API" placement="right">
                        <el-radio :label="1" border>Hook</el-radio>
                      </el-tooltip>
                    </div>
                    <div>
                      <el-tooltip class="item" effect="light" content="Execute in Export State" placement="right">
                        <el-radio :label="2" border>Export</el-radio>
                      </el-tooltip>
                    </div>
                  </div>
                </el-radio-group>
              </div>
              <div class="lua-debug-command-button-wrapper">
                <!-- send debug string button should only be available if operation phase is running -->
                <el-button type="primary" plain size="small" @click="sendDebugString">Send</el-button>
                <el-button type="warning" plain size="small">Clear</el-button>
              </div>
            </el-col>
          </el-collapse-item>
        </el-collapse>

      </el-col>
      <el-col :span="6">
        <keep-alive>
          <server-info-panel></server-info-panel>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LogPanel from "@/views/logging/LogPanel";
  import ServerInfoPanel from "@/views/logging/ServerInfoPanel";
  import LuaDebugService from "../services/LuaDebugService";

  export default {
    name: "LuaConsole",
    components: {
      ServerInfoPanel,
      LogPanel},
    data() {
      return {
        activeName: '',

        debugEnvironment: 0,  // default to 0, in mission environment

        currentResult: '',

        luaDebugString: 'trigger.action.outText("Hello from Project Lava Web Console!", 10)',
      }
    },

    methods: {
      sendDebugString() {
        console.log(typeof this.debugEnvironment);

        LuaDebugService.sendLuaDebugString({
          luaString: this.luaDebugString,
          level: this.debugEnvironment,
          timeStamp: new Date(),
        }).then(res => {
          this.currentResult = res.data;
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .lua-console-wrapper {
    margin: 10px 40px;

    .env-select-radio-group-wrapper {
      text-align: left;
      margin-left: 20px;

      .env-select-radio-title-wrapper {
        margin-bottom: 10px;

        .env-select-radio-title {
          font-weight: bold;
        }
      }

      .env-select-radio-button-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
      }
    }

    .lua-debug-command-button-wrapper {
      display: flex;
      justify-content: flex-start;
      margin: 10px 20px;

      .el-button {
        width: 64px;
        height: 64px;
      }
    }

    .env-select-radio-button-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      div {
        margin-bottom: 5px;

        .el-radio {
          width: 138px;
        }
      }
    }

    .lua-debug-string-text-area {
      ::v-deep .el-textarea__inner {
        background-color: #42b983;
        min-height: 600px;
        height: 600px;
      }
    }

}
</style>