<template>
  <el-container class="config-options-wrapper" v-loading="awaitData">
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form v-model="portConfig">
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
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form v-model="portConfig">
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
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-row>
        <!--        <el-footer>-->
        <el-button @click="testSendRequest">Confirm</el-button>
        <el-button @click="testPostRequest">Cancel</el-button>
        <!--        </el-footer>-->
      </el-row>
    </el-footer>
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
        awaitData: true,

        portConfig: new PortConfig()
      }
    },

    mounted() {
      connectionService.getDataPortConfig().then(res => {
        console.log(res);
        this.portConfig = res.data;
        this.awaitData = false;
      });
    },

    methods: {
      testSendRequest() {
        connectionService.getDataPortConfig().then(res => {
          console.log(res);
        })
      },

      testPostRequest() {
        this.$http.post('/api/config/port', {
          serverMainPort: this.serverMainPort,
          serverPollPort: this.serverPollPort,
          exportMainPort: this.exportMainPort,
          exportPollPort: this.exportPollPort
        }).then(res => {
          console.log(res);
        });
      }
    }
  }
</script>

<style scoped>
  .config-options-wrapper {
    /*margin: 20px;*/
    /*padding: 20px;*/
  }
</style>