<template>
  <el-container class="config-options-wrapper" v-loading="isLoading">
    <el-main>
      <el-form v-model="dcsPort">
        <el-form-item label="Server Main Port">
          <el-input v-model="dcsPort.serverMainPort"></el-input>
        </el-form-item>
        <el-form-item label="Server Poll Port">
          <el-input v-model="dcsPort.serverPollPort"></el-input>
        </el-form-item>
        <el-form-item label="Export Main Port">
          <el-input v-model="dcsPort.exportMainPort"></el-input>
        </el-form-item>
        <el-form-item label="Export Poll Port">
          <el-input v-model="dcsPort.exportPollPort"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
// import connectionService, {PortConfig} from "@/services/ConnectionService";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConnectionPortConfig",

  data() {
    return {
      // portConfig: new PortConfig()
    }
  },

  computed: {
    ...mapGetters('configuration', ["dcsPort", "isLoading"])
  },

  mounted() {
    this.getDcsPortConfiguration();

    console.log(this.dcsPort);
  },

  methods: {
    ...mapActions('configuration', ["getDcsPortConfiguration"])
  },
}
</script>

<style lang="scss" scoped>
.config-options-wrapper {
  margin: 20px;
  padding: 20px;
  border: 1px solid #d8d8d8;
}
</style>