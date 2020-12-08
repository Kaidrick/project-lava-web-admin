<template>
  <el-dialog :visible.sync="dialogVisible"
             :before-close="close"
             append-to-body
             destroy-on-close
             :title="controlTypeName">
    <div class="server-control-wrapper">
      <div class="control-detail-wrapper">
        <el-form :model="formData">
          <el-form-item label="Type">
            <el-select v-model="formData.resetType" prop="resetType">
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
          <el-popconfirm :title="`Confirm ${controlTypeName}?`"
                         confirmButtonText="YES"
                         cancelButtonText="NO"
                         @onConfirm="confirm">
            <el-button slot="reference">Confirm</el-button>
          </el-popconfirm>
          <el-button @click="close">Cancel</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import ServerControl from "../../../services/config/ServerControl";
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
          resetType: 0,
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

      confirm() {
        this.$message.success("confirmed");
        ServerControl.commandServerRestart({
          restartTime: new Date(),
          reason: this.formData.reason,
          resetType: this.formData.resetType})
                .then(res => {
                  if (res.success && res.data.data) {
                    this.$message.success("Success!")
                  } else {
                    this.$message.error(res.data.msg);
                  }
                })
      },

      close() {

        this.dialogVisible = false;

        for (let [key, value] of Object.entries(this.formData)) {
          console.log(`${key}: ${value}`);
          this.formData[key] = null;
        }
      },


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