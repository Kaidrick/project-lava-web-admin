<template>
    <el-dialog :visible.sync="dialogVisible"
               :before-close="close"
               append-to-body
               custom-class="addon-dialog"
               destroy-on-close>
        <div slot="title">{{ plugin.name }} ({{plugin.ident}})</div>
        <iframe class="view-frame" :src="src"></iframe>
    </el-dialog>
</template>

<script>
    export default {
        name: "AddonManageView",

        data() {
            return {
                dialogVisible: false,
                plugin: {},
                src: ''
            }
        },

        methods: {
            show(plugin) {
                this.$message.success(plugin.name + ", " + plugin.ident);
                this.plugin = plugin;
                this.src = `http://localhost:8080/view/${this.plugin.ident}`;
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
                .view-frame {
                    border: none;
                    width: 100%;
                    flex: 1;
                }
            }
        }
    }


</style>