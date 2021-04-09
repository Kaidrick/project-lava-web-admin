<template>
  <div class="wizard-system-config">
    <el-form :model="systemConfigDataForm" inline label-width="180px" label-position="left">
      <div class="wizard-server-init mono-wrapper">
        <p>{{ $t('wizard_system_backend_init') }}</p>
        <div class="system-code-path-highlight">{{ $t('wizard_system_backend_pw_gen_path') }}</div>
        <p>{{ $t('wizard_system_backend_instruction') }}</p>
        <div class="form-item-block">
          <el-form-item :label="$t('Superuser Password')" prop="rootPassword">
            <el-input v-model="systemConfigDataForm.rootPassword"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="wizard-system-host mono-wrapper">
        <p>
          {{ $t('wizard_system_config_host_addr') }}
        </p>
        <div class="system-code-path-highlight">{{ $t('wizard_system_config_local_host') }}</div>
        <div class="system-code-path-highlight">{{ $t('wizard_system_config_local_ip') }}</div>
        <div class="system-code-path-highlight">{{ $t('wizard_system_config_remote_ip') }}</div>

        <p>
          {{ $t('wizard_system_config_host_addr_instruction') }}
        </p>

        <div class="form-item-block">
          <el-form-item :label="$t('DCS Server Host')" prop="hostAddress">
            <el-input v-model="systemConfigDataForm.hostAddress"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="wizard-system-tcp-port mono-wrapper">
        <p>
          {{ $t('wizard_system_config_tcp_port') }}
        </p>
        <div class="form-item-block">
          <el-form-item :label="$t('DCS Server TCP Port')" prop="hostPortNumber">
            <el-input v-model="systemConfigDataForm.hostPortNumber"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="wizard-system-connection-test mono-wrapper" v-if="testOptionVisible">
        <div class="connection-tcp-ping-test-wrapper">
          <p>Your connection parameter is set as follows:</p>
          <p>User Name: <span class="system-code-path-highlight">root</span> (default super user login)</p>
          <p>Password: <span class="system-code-path-highlight">{{ systemConfigDataForm.rootPassword }}</span></p>
          <p>API Service:
            <span class="system-code-path-highlight">{{ systemConfigDataForm.hostAddress }}:{{ systemConfigDataForm.hostPortNumber }}</span>
          </p>
          <div class="ping-test-operator form-item-block">
            <div class="ping-test-operator__test-button">
              <el-button @click="ping" size="small">Test Connection</el-button>
            </div>
            <div class="ping-test-operator__result" style="display: flex">
              <div style="margin: auto auto">{{ pingTestResult }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import ConnectionService from "@/services/ConnectionService";

export default {
  name: "System",

  data() {
    return {
      systemConfigDataForm: {
        rootPassword: '',
        hostAddress: '',
        hostPortNumber: ''
      },

      pingTestResult: '',

      rules: {}
    }
  },

  computed: {
    testOptionVisible() {
      return this.systemConfigDataForm.rootPassword && this.systemConfigDataForm.hostAddress &&
          this.systemConfigDataForm.hostPortNumber
    }
  },

  methods: {
    ping() {
      ConnectionService.requestLoginInfoValidation("root", this.systemConfigDataForm.rootPassword).then(res => {
        console.log(res, 'reject res?')
        const { success, data, message } = res.data;
        if (success === this.$dict.statusCode.success) {
          if (data.enable) {
            this.pingTestResult = "CONNECTION OK";
          } else {
            this.pingTestResult = "ACCOUNT IS DISABLED";
          }
        } else {
          this.pingTestResult = message;
        }
      }).catch(e => {
        console.log(e, 'exception');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";
  .wizard-system-config {
    .form-item-block {
      padding: 10px;
      border: 1px solid $primary_light;
    }

    ::v-deep .el-form {
      .el-form-item {
        padding-top: 22px;
        display: inline-flex;
        width: 100%;
        .el-form-item__content {
          flex: 1;
        }
      }
    }

    .system-code-path-highlight {
      padding: 5px;
      background-color: $primary_light;
      font-family: monospace;
      font-size: 16px;
    }

    .mono-wrapper {
      margin-bottom: 20px;
    }

    .wizard-server-init, .wizard-system-host, .wizard-system-tcp-port, .connection-tcp-ping-test-wrapper {
      padding: 20px
    }

    .connection-tcp-ping-test-wrapper {
      .ping-test-operator {
        display: flex;
        flex-direction: row;
      }
    }
  }
</style>