<template>
  <div class="dashboard-wrapper">
    <el-row :gutter="10">
      <el-col class="block" :span="8">
        <div class="block-content">
          <div>Resource Telemetry</div>
          <div>
            <div>Lua Memory Mission</div>
            <div>Lua Memory Hook</div>
            <div>Lua Memory Export</div>
            <div>Request Response Time</div>
            <div>Longest -> which ?</div>
            <div>Fastest -> which ?</div>
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
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
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
