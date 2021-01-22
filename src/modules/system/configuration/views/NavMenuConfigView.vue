<template>
  <div class="nav-menu-config-view-wrapper mono-wrapper" v-loading="isLoading">
    <div class="nav-menu-config-view-title">User Menu Settings</div>
    <div class="sp-10"></div>
<!--    <el-button @click="testAddRoute">TEST ADD ROUTE</el-button>-->
    <div class="nav-menu-config-tree-display-wrapper">
      <el-tree :data="menus"
               draggable
               @node-drag-start="handleDragStart"
               @node-drag-enter="handleDragEnter"
               @node-drag-leave="handleDragLeave"
               @node-drag-over="handleDragOver"
               @node-drag-end="handleDragEnd"
               @node-drop="handleDrop"
               :allow-drop="allowDrop"
               :allow-drag="allowDrag"
               :props="{label: 'name', children: 'children', leaf: 'leaf'}"
               :expand-on-click-node="false"
               :default-expand-all="true"
               @current-change="handleNodeClick"
               empty-text="NO DATA">
        <div class="nav-menu-config-item"
             :class="{'current-selected': currentSelectedNode.id === scope.data.id}"
             slot-scope="scope"
             style="display: flex; width: 100%; justify-content: space-between">
          <div>{{ scope.data.name }}</div>
          <div>Path: {{ scope.data.path || '-' }}</div>
        </div>
      </el-tree>
    </div>
    <div class="nav-menu-config-button-op-button-wrapper">
      <el-button @click="$refs.editNavMenuDialog.show()">Add Menu</el-button>
      <el-button @click="$refs.editNavMenuDialog.show(currentSelectedNode)">Edit Menu</el-button>
      <el-button @click="testTreeData">Print Tree</el-button>
      <el-button v-if="updateList.length > 0" @click="$message.success('confirm change')">Save</el-button>
    </div>

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
        isLoading: false,
        currentSelectedNode: {},

        updateList: [],
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

      testTreeData() {
        console.log(JSON.stringify(this.menus));
      },

      getNavMenuTree() {
        this.isLoading = true;

        this.getNavMenus().then(res => {
          this.menus = tree.listToTreeOrdered(res.data.data, (a, b) => a.ordinal - b.ordinal);
        }).finally(() => this.isLoading = false);
      },

      // eslint-disable-next-line no-unused-vars
      handleNodeClick(data, node) {
        // this.$message.success("click")
        // console.log(data, node);

        this.currentSelectedNode = data;
      },

      // eslint-disable-next-line no-unused-vars
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      // eslint-disable-next-line no-unused-vars
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      // eslint-disable-next-line no-unused-vars
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      // eslint-disable-next-line no-unused-vars
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      // eslint-disable-next-line no-unused-vars
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      // eslint-disable-next-line no-unused-vars
      handleDrop(draggingNode, dropNode, dropType, ev) {
        switch (dropType) {
          case 'inner':
            draggingNode.data.pid = dropNode.data.id;
            break;
          case 'before':
            draggingNode.data.pid = dropNode.data.pid;
            break;
          case 'after':
            draggingNode.data.pid = dropNode.data.pid;
            break;
          default:
            break;
        }

        // after drop, find parent and re-arrange ordinal

      },
      // eslint-disable-next-line no-unused-vars
      allowDrop(draggingNode, dropNode, type) {
        return true;
      },
      // eslint-disable-next-line no-unused-vars
      allowDrag(draggingNode) {
        return true;
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

  .nav-menu-config-view-wrapper {
    .nav-menu-config-tree-display-wrapper {
      margin: 10px;

      .el-tree {
        .nav-menu-config-item {

        }
      }
    }

    .nav-menu-config-button-op-button-wrapper {
      margin: 10px;
    }
  }

  //.current-selected {
  //  color: #FFEF28;
  //
  //  * {
  //    color: #FFEF28;
  //  }
  //}
</style>