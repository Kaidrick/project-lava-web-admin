<template>
  <div class="lua-console-wrapper">
    <el-row>
      <el-col :span="18">
        <log-panel/>
      </el-col>
      <el-col :span="6">
        <server-info-panel></server-info-panel>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="18">
        <div>
          <span>Lua Console</span>
          <el-select v-model="debugEnvironment" value="0">
            <el-option :value="0" label="Mission">Mission</el-option>
            <el-option :value="1" label="Hook">Hook</el-option>
            <el-option :value="2" label="Export">Export</el-option>
          </el-select>
          <el-input type="textarea"
                    v-model="luaDebugString"
                    placeholder="Enter Lua code to be executed in selected environment here."></el-input>
          <el-button @click="sendDebugString">Send</el-button>

          <el-input type="textarea" v-model="currentResult"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-radio-group style="display: inline-block">
            <el-radio label="Mission" value="0" border></el-radio>
            <el-radio label="Hook" value="1" border></el-radio>
            <el-radio label="Export" value="2" border></el-radio>
          </el-radio-group>
        </div>
      </el-col>


    </el-row>
<!--    <el-container>-->
<!--      <log-panel/>-->
<!--    </el-container>-->

  </div>
</template>

<script>

  import LogPanel from "@/views/logging/LogPanel";
  import ServerInfoPanel from "@/views/logging/ServerInfoPanel";
  export default {
    name: "LuaConsole",
    components: {ServerInfoPanel, LogPanel},
    data() {
      return {
        debugEnvironment: 0,  // default to 0, in mission environment

        currentResult: '',

        luaDebugString: 'trigger.action.outText("Hello from Project Lava Web Console!", 10)',
      }
    },

    methods: {
      sendDebugString() {
        this.$http.post('/api/lua/debug', {
          luaString: this.luaDebugString,
          level: this.debugEnvironment,
          timeStamp: new Date(),
        }).then(res => {
          this.currentResult = res.data;
        })
      }
    },
  }
</script>

<style scoped>

</style>