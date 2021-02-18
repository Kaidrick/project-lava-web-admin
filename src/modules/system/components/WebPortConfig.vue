<template>
  <div class="login-options-wrapper">
    <div class="login-form-wrapper">
      <div class="lava-login-info-title">Lava Control Panel Login</div>
      <el-form ref="loginForm" v-model="webConfig">
        <el-form-item label="Lava Backend Host">
          <el-input v-model="webConfig.host">
            <template slot="prepend">https://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Lava Service Port">
          <el-input v-model="webConfig.port"></el-input>
        </el-form-item>
        <el-form-item label="User Name">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="medium" @click="validateAndPush">CONNECT</el-button>

      <div class="lava-login-info-footer">
        <a href="https://github.com/Kaidrick/Project-Lava" style="color: whitesmoke">https://github.com/Kaidrick/Project-Lava</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "WebPortConfig",

    data () {
      return {
        username: '',
        password: ''
      }
    },

    computed: {
      ...mapGetters('system', ["webConfig", "dataServiceResource"])
    },

    methods: {
      ...mapActions('system', ["test", "updateDataServiceResource"]),

      validateAndPush() {
        this.updateDataServiceResource(`${this.webConfig.host}:${this.webConfig.port}`)

        // must be http
        this.$wsConnect(`https://${this.dataServiceResource}/lava-ws`,  // FIXME: very bad
            () => {
              this.$message.success("Websocket connection established");
              this.test();
            },
            error => {
              this.$message.error("Disconnected from backend websocket:" + error);
            }
        );
        // this.$router.push({name: 'Dashboard', path: '/'})

        // clear form data
        this.$refs.loginForm.resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/color-scheme";
  .login-options-wrapper {
    width: 300px;
    margin: auto auto;
    padding: 20px;

    .login-form-wrapper {
      .lava-login-info-title {
        font-weight: bolder;
      }

      ::v-deep .el-form {
        .el-form-item {
          .el-form-item__content {
            .el-input {
              .el-input-group__prepend {
                background: $primary;
                color: whitesmoke;
                border: 1px solid $primary_light;
                padding: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>