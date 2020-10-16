<template>
  <el-dialog :visible.sync="dialogVisible" :before-close="close" :title="controlTypeName">
    <div class="server-control-wrapper">
      <div class="control-detail-wrapper">
        <el-form :model="formData">
          <el-form-item label="Type">
            <el-select v-model="formData.restartType" prop="restartType">
              <el-option label="DCS Server Only" :value="0"></el-option>
              <el-option label="Lava Backend Only" :value="1"></el-option>
              <el-option label="DCS Server and Lava Backend" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Reason" inline>
            <el-input v-model="formData.reason" prop="reason"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ServerControlDialog",

    props: {
      controlType: -1
    },

    computed: {
      controlTypeName() {
        switch (this.controlType) {
          case 0:
            return "Restart Server";
          case 1:
            return "Shutdown Server";
          case 2:
            return "Schedule Server Operation";
          default:
            return "Server Control"
        }
      }
    },

    data() {
      return {
        formData: {
          reason: '',
          restartType: 0,
          time: this.formatDate(new Date(), "yyyy")
        },
        dialogVisible: false
      }
    },

    methods: {
      show(controlType) {
        this.controlType = controlType;
        this.dialogVisible = true;
      },

      close(callback) {
        for (const data in Object.getOwnPropertyNames(this.formData)) {
          this.formData[data] = null;
        }

        callback();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>