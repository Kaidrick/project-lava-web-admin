<template>
  <div class="nav-menu-config-view-wrapper" v-loading="isLoading">
    <div class="sp-10"></div>

    <div>User Menu Settings</div>
    <el-button @click="testAddRoute">TEST ADD ROUTE</el-button>
    <el-tree :data="menus"
             :props="{label: 'name', children: 'children', leaf: 'leaf'}"
             :default-expand-all="true"
             empty-text="NO DATA">

    </el-tree>
    <el-button @click="$refs.editNavMenuDialog.show()">Add Menu</el-button>
    <edit-nav-menu-dialog-modal ref="editNavMenuDialog" @submit="getNavMenuTree"></edit-nav-menu-dialog-modal>

  </div>
</template>

<script>
  import tree from "@/services/common/tree";
  import { mapActions, mapGetters } from 'vuex';
  import EditNavMenuDialogModal from "@/modules/system/configuration/components/EditNavMenuDialogModal";
  export default {
    name: "NavMenuConfigView",
    components: {EditNavMenuDialogModal},

    data() {
      return {
        menus: [],
        isLoading: false
      }
    },

    computed: {
      ...mapGetters('configuration', ['navMenuList'])
    },

    mounted() {
      this.getNavMenuTree();
    },

    methods: {
      ...mapActions('configuration', ['getNavMenus', 'addNavMenu']),
      ...mapActions('system', ['freshSystemRouteMap']),

      testAddRoute() {
        this.$router.addRoutes([
            {
              path: '/bingo/testAbout',
              name: 'Test About',
              component: () => import('@/views/About')
        }]);

        this.freshSystemRouteMap();
      },

      getNavMenuTree() {
        this.isLoading = true;

        this.getNavMenus().then(res => {
          this.menus = tree.listToTree(res.data.data);
        }).finally(() => this.isLoading = false);
      }
    }
  }
</script>

<style lang="scss" scoped>
.system-config-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>