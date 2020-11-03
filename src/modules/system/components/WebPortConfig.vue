<template>
  <div class="config-options-wrapper">
    <el-form v-model="webConfig">
      <el-form-item label="Lava Backend Host">
        <el-input v-model="webConfig.host"></el-input>
      </el-form-item>
      <el-form-item label="Lava API Port">
        <el-input v-model="webConfig.port"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="validateAndPush">OK</el-button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "WebPortConfig",

    computed: {
      ...mapGetters('system', ["webConfig"])
    },

    methods: {
      ...mapActions('system', ["test"]),

      validateAndPush() {
        this.test();
        this.$wsConnect("http://localhost:8080/gs-guide-websocket");
        // this.$router.push({name: 'Dashboard', path: '/'})
        this.$message.success("set web port success!")
      }
    }
  }
</script>

<style lang="scss" scoped>
  .config-options-wrapper {
    width: 300px;
    margin: auto auto;
    padding: 20px;
  }
</style>