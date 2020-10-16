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
        <div slot="footer" class="button-wrapper">
          <el-popconfirm :title="`Confirm ${controlTypeName}?`" confirmButtonText="YES" cancelButtonText="NO">
            <el-button slot="reference">Confirm</el-button>
          </el-popconfirm>
          <el-button @click="close">Cancel</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "ServerControlDialog",

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
          time: new Date()
        },
        controlType: 0,
        dialogVisible: false
      }
    },

    methods: {
      show(controlType) {
        this.controlType = controlType;
        this.dialogVisible = true;
      },

      close(callback) {
        for (let [key, value] of Object.entries(this.formData)) {
          console.log(`${key}: ${value}`);
          this.formData[key] = null;
        }

        callback();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .server-control-wrapper {
    .control-detail-wrapper {
      .button-wrapper {
        display: flex;
      }
    }
  }
</style>