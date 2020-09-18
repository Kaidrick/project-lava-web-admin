<template>
  <div class="lua-console-wrapper">
    <el-collapse v-model="activeName">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="console-item-name">Server Logs</span>
        </template>
        <log-panel/>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span class="console-item-name">Lua Debug Console</span>
        </template>
        <el-col :span="18">
          <div class="console-input-wrapper dark">
            <span class="console-section-name">Return</span>
            <el-input class="lua-debug-return-string-text-area"
                      type="textarea"
                      readonly
                      placeholder='Add "return" in front of the debug command if the command is expected to return a value.'
                      v-model="currentResult"></el-input>
            <span class="console-section-name">Command</span>

            <!--                  <el-scrollbar style="height: 100%">-->
            <!--                    <el-input class="lua-debug-string-text-area"-->
            <!--                              type="textarea"-->
            <!--                              v-model="luaDebugString"-->
            <!--                              autosize-->
            <!--                              placeholder="Enter Lua code to be executed in selected environment here."></el-input>-->
            <!--                  </el-scrollbar>-->
            <div id="codeeditor"></div>

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
            <el-button class="lua-debug-exec-button" plain size="small" @click="sendDebugString">Send</el-button>
            <el-button class="lua-debug-clear-button" plain size="small" @click="clearDebugString">Clear</el-button>
          </div>
        </el-col>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import LogPanel from "@/views/logging/LogPanel";
  // import ServerInfoPanel from "@/components/logging/ServerInfoPanel";
  import LuaDebugService from "@/services/LuaDebugService";
  import * as CodeMirror from 'codemirror/lib/codemirror';
  import * as Lua from 'codemirror/mode/lua/lua';

  export default {
    name: "LuaConsole",
    components: {
      // ServerInfoPanel,
      LogPanel
    },
    data() {
      return {
        activeName: '',

        debugEnvironment: 0,  // default to 0, in mission environment

        currentResult: '',

        luaDebugString: 'trigger.action.outText("Hello from Project Lava Web Console!", 10)',

        editor: CodeMirror
      }
    },

    mounted() {
      this.editor = CodeMirror(document.getElementById("codeeditor"), {
        value: "\n",
        mode: "lua",
        theme: "darcula",
        lineNumbers: true,
        autoRefresh: true
      });
      this.editor.refresh();
      console.log(Lua);
    },

    methods: {
      sendDebugString() {
        console.log(this.editor.getValue());

        console.log(typeof this.debugEnvironment);

        LuaDebugService.sendLuaDebugString({
          luaString: this.editor.getValue(),
          level: this.debugEnvironment,
          timeStamp: new Date(),
        }).then(res => {
          this.currentResult = res.data;
        });
      },

      clearDebugString() {
        this.luaDebugString = '';
        this.currentResult = '';
        this.editor.setValue('');
        this.editor.refresh();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~codemirror/lib/codemirror.css';
  @import '../assets/style/editor';

  .lua-console-wrapper {
    margin: 10px 10px;

    .console-item-name {
      padding-left: 30px;
      font-size: 16px;
      font-weight: bold;
    }

    .env-select-radio-group-wrapper {
      text-align: left;
      margin-left: 20px;

      .env-select-radio-title-wrapper {
        margin-top: 10px;

        .env-select-radio-title {
          font-weight: bold;
          font-size: 14px;
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

      .lua-debug-exec-button {
        width: 64px;
        height: 64px;

        background: url("~@/assets/lua_102040.png") center center no-repeat;
        background-size: 48px auto;
      }

      .lua-debug-clear-button {
        width: 64px;
        height: 64px;

        background: url("~@/assets/eraser.png") center center no-repeat;
        background-size: 48px auto;

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

    .console-input-wrapper {
      margin: 10px;

      .console-section-name {
        font-size: 14px;
        font-weight: bold;
      }

      .lua-debug-return-string-text-area {
        min-height: 120px;
        height: 120px;

        ::v-deep .el-textarea__inner {
          min-height: 120px;
          height: 120px;
        }
      }

      .lua-debug-string-text-area {
        min-height: 360px;
        height: 360px;

        ::v-deep .el-textarea__inner {
          min-height: 360px;
          height: 360px;
        }
      }
    }

}
</style>