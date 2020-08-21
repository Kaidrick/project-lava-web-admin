<template>
  <div>
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
  </div>
</template>

<script>
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
      }
    },

    mounted() {

    },

    methods: {
      testSendRequest() {
        this.$http.get('/api/config/get').then(res => {
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