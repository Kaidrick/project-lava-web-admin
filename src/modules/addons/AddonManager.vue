<template>
    <div class="addon-manager-wrapper">
        <div class="card-box">
            <el-card class="addon-card"
                     v-for="(plugin, index) in pluginList"
                     :key="index" @click.native="handleAddonCardOpen(plugin)">
                <div>{{ plugin.name }}</div>
                <div>{{ plugin.name }}</div>
                <div>{{ plugin.name }}</div>
                <div>{{ plugin.name }}</div>
            </el-card>
        </div>
        <addon-manage-view ref="addonManageView"></addon-manage-view>
    </div>
</template>

<script>
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
            for (let i = 0; i < 10; i++) {
                this.pluginList.push({
                    name: 'Navigation Data Provider',
                    ident: 'moe.ofs.addon-NavData-1.0-SNAPSHOT',
                    description: 'Test Entry for Navigation Data Provider plugin.'
                });
            }
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