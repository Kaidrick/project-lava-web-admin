<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- set port to be used to connect to dcs world server -->
    <div>
      <port-config></port-config>
    </div>
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