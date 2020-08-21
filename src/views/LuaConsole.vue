<template>
  <div class="lua-console-wrapper">
    <span>Lua Console</span>
    <el-select v-model="debugEnvironment" value="0">
      <el-option :value="0" label="Mission">Mission</el-option>
      <el-option :value="1" label="Hook">Hook</el-option>
      <el-option :value="2" label="Export">Export</el-option>
    </el-select>
    <el-input type="textarea"
              v-model="luaDebugString"
              placeholder="Enter Lua code to be executed in selected environment here."></el-input>
    <el-button>Send</el-button>
  </div>
</template>

<script>

  export default {
    name: "LuaConsole",

    data() {
      return {
        debugEnvironment: 0,  // default to 0, in mission environment

        luaDebugString: 'trigger.action.outText("Hello from Project Lava Web Console!", 10)',
      }
    }
  }
</script>

<style scoped>

</style>