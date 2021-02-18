<template>
    <el-dialog :visible.sync="dialogVisible"
               :before-close="close"
               append-to-body
               custom-class="addon-dialog"
               destroy-on-close>
        <div slot="title">{{ plugin.name }} ({{plugin.ident}})</div>
      <div class="iframe-wrapper" v-loading="isLoading">
        <iframe ref="customViewFrame" class="view-frame" :src="src"></iframe>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "AddonManageView",

        data() {
            return {
                dialogVisible: false,
                plugin: {},
                src: '',

              isLoading: false
            }
        },

      mounted() {

      },

      methods: {
            show(plugin) {
              this.isLoading = true;

              this.$nextTick(() => {
                console.log(this.$refs.customViewFrame);
                this.$refs.customViewFrame.addEventListener('load', () => {
                  this.isLoading = false;
                })
              })

                this.$message.success(plugin.name + ", " + plugin.ident);
                this.plugin = plugin;

                // FIXME: very bad?
                this.src = `https://localhost:8080/view/${this.plugin.ident}`;
              this.dialogVisible = true;
            },

            close(done) {
                this.dialogVisible = false;
                done && done();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-dialog__wrapper {
        display: flex;

        ::v-deep .addon-dialog {
            margin-top: 5vh !important;
            margin-bottom: 5vh !important;
            flex: 0.5 auto;
            display: flex;
            flex-direction: column;

            .el-dialog__header {

            }

            .el-dialog__body {
                padding: 0;
                display: flex;
                flex-direction: column;
                flex: 1;

              .iframe-wrapper {
                display: flex;
                flex: 1;
                height: calc(100% - 160px);

                .view-frame {
                  border: none;
                  width: 100%;
                  flex: 1;
                }
              }

            }
        }
    }


</style>