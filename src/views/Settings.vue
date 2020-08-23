<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- set port to be used to connect to dcs world server -->
    <el-main>
      <port-config></port-config>
    </el-main>
  </el-container>
</template>

<script>
  import PortConfig from "@/views/settings/components/PortConfig";
  export default {
    name: "Settings",
    components: {
      PortConfig
    },
  }
</script>

<style scoped>

</style>