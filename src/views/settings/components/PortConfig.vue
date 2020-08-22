<template>
  <el-container v-loading="true">
    <el-form>
      <el-form-item label="Server Main Port">
        <el-input v-model="serverMainPort"></el-input>
      </el-form-item>
      <el-form-item label="Server Poll Port">
        <el-input v-model="serverPollPort"></el-input>
      </el-form-item>
      <el-form-item label="Export Main Port">
        <el-input v-model="exportMainPort"></el-input>
      </el-form-item>
      <el-form-item label="Export Poll Port">
        <el-input v-model="exportPollPort"></el-input>
      </el-form-item>

      <el-button @click="testSendRequest">Confirm</el-button>
      <el-button @click="testPostRequest">Cancel</el-button>
    </el-form>
    
    <el-form>
      <el-form-item label="Server Main Port">
        <el-input v-model="portConfig.serverMainPort"></el-input>
      </el-form-item>
      <el-form-item label="Server Poll Port">
        <el-input v-model="portConfig.serverPollPort"></el-input>
      </el-form-item>
      <el-form-item label="Export Main Port">
        <el-input v-model="portConfig.exportMainPort"></el-input>
      </el-form-item>
      <el-form-item label="Export Poll Port">
        <el-input v-model="portConfig.exportPollPort"></el-input>
      </el-form-item>

      <el-button @click="testSendRequest">Confirm</el-button>
      <el-button @click="testPostRequest">Cancel</el-button>
    </el-form>
  </el-container>
</template>

<script>
import connectionService, {PortConfig} from "@/services/ConnectionService";

export default {
    name: "PortConfig",

    props: {

    },

    data() {
      return {
        serverMainPort: '',
        serverPollPort: '',
        exportMainPort: '',
        exportPollPort: '',

        portConfig: new PortConfig()
      }
    },

    mounted() {
      this.portConfig = connectionService.getDataPortConfig();  // try synchronized request?
    },

    methods: {
      testSendRequest() {
        connectionService.getDataPortConfig().then(res => {
          console.log(JSON.stringify(res));
        })
      },

      testPostRequest() {
        this.$http.post('/api/config/port', {
          serverMainPort: this.serverMainPort,
          serverPollPort: this.serverPollPort,
          exportMainPort: this.exportMainPort,
          exportPollPort: this.exportPollPort
        }).then(res => {
          console.log(JSON.stringify(res))
        })
      }
    }
  }
</script>

<style scoped>

</style>