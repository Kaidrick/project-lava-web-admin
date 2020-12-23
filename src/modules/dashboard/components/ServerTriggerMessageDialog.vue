<template>
  <el-dialog :visible.sync="dialogVisible"
             :before-close="close"
             append-to-body
             destroy-on-close
             :title="messageTypeName">
    <div class="broadcast-message-wrapper">
      <div class="broadcast-message-content-wrapper">
        <el-input type="textarea"
                  v-model="messageRequest.message"
                  resize="none"
                  placeholder="Enter message here" :autosize="{ minRows: 3, maxRows: 8 }">
        </el-input>
      </div>
      <div class="sp-10"></div>
      <div class="broadcast-control-button-wrapper">
        <el-button size="small" @click="broadcastMessage">BROADCAST</el-button>
        <el-button size="small" @click="reset">RESET</el-button>
        <el-switch v-model="messageRequest.useTriggerMessageWhenPossible"
                   :active-text="prioritizeTriggerMessage"></el-switch>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {TriggerMessageRequest} from "@/data/message";
  import TriggerMessageService from "@/services/message/TriggerMessageService";

  export default {
    name: "ServerTriggerMessageDialog",

    data() {
      return {
        messageType: -1,
        dialogVisible: false,
        messageRequest: new TriggerMessageRequest()
      }
    },

    computed: {
      messageTypeName() {
        switch (this.messageType) {
          case 0:
            return "Broadcast To All Players";
          case 1:
            return "Broadcast To Blue Players";
          case 2:
            return "Broadcast To Red Players";
          case 3:
            return "Broadcast To Neutral";
          default:
            return "Broadcast Message";
        }
      },

      prioritizeTriggerMessage() {
        return this.messageRequest.useTriggerMessageWhenPossible ?
            "Send trigger message to players in active aircraft" : "Broadcast use chat message only"
      }
    },

    methods: {
      broadcastMessage() {
        TriggerMessageService.sendTriggerMessage(this.messageRequest).then(res => {
          console.log(res.data);
          if (res.data.success) {
            this.$message.success("Broadcast sent to " + this.messageTypeName)
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      show(messageType) {
        this.messageType = messageType;
        this.dialogVisible = true;
      },

      reset() {
        this.messageRequest = new TriggerMessageRequest();
      },

      close() {
        this.dialogVisible = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .broadcast-message-wrapper {
    .broadcast-message-content-wrapper {

    }

    .broadcast-control-button-wrapper {
      * {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>