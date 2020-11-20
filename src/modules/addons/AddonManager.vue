<template>
    <div class="addon-manager-wrapper">
        <div class="card-box">
            <el-card class="addon-card"
                     v-for="(plugin, index) in pluginList"
                     :key="index" @click.native="handleAddonCardOpen(plugin)">
                <div>{{ plugin.name }}</div>
                <div>{{ plugin.ident }}</div>
                <div>{{ plugin.description }}</div>
            </el-card>
        </div>
        <addon-manage-view ref="addonManageView"></addon-manage-view>
    </div>
</template>

<script>
    import AddonService from "@/services/addons/AddonService";
    import AddonManageView from "./components/AddonManageView";
    export default {
        name: "AddonManager",
        components: {AddonManageView},
        data() {
          return {
              pluginList: []
          }
        },

        mounted() {
            AddonService.getAddonList().then(res => {
              if (res.data.success) {
                this.pluginList = res.data.data.sort((a, b) => a.id - b.id);
              } else {
                this.$message.error("Unable to get addon list");
              }
            })
        },

        methods: {
            handleAddonCardOpen(plugin) {
                this.$refs.addonManageView.show(plugin);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .addon-manager-wrapper {
        .card-box {
            display: flex;
            flex-wrap: wrap;

            .addon-card {
              min-width: 240px;
                width: 24%;
                max-height: 400px;
                background-color: #42b983;
                color: white;

                margin-right: 10px;
                margin-bottom: 10px;

                border-radius: 0;
                border: none;

                &:hover {
                    background-color: darken(#42b983, 10);

                    cursor: pointer;
                }
            }
        }


    }
</style>