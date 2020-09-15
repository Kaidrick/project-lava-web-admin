<template>
  <div>
    <connection-port-config></connection-port-config>
  </div>
</template>

<script>
  import ConnectionPortConfig from "@/modules/system/configuration/components/ConnectionPortConfig";
  export default {
    name: "SystemConfigView",
    components: {ConnectionPortConfig},
  }
</script>

<style lang="scss" scoped>

</style>