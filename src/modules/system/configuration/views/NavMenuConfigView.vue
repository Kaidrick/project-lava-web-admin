<template>
  <div class="nav-menu-config-view-wrapper mono-wrapper" v-loading="isLoading">
    <div class="nav-menu-config-view-title">User Menu Settings</div>
    <div class="sp-10"></div>
    <div class="nav-menu-config-tree-display-wrapper">
      <el-tree :data="menus"
               ref="navMenuTree"
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
      <el-button v-if="updateIdSet.size > 0"
                 @click="saveNodeUpdate">Save
      </el-button>
    </div>

    <edit-nav-menu-dialog-modal ref="editNavMenuDialog" @submit="getNavMenuTree"></edit-nav-menu-dialog-modal>

  </div>
</template>

<script>
import tree from "@/services/common/tree";
import SystemNavMenu from "@/services/config/SystemNavMenu";
import {mapActions, mapGetters} from 'vuex';
import EditNavMenuDialogModal from "@/modules/system/configuration/components/EditNavMenuDialogModal";

export default {
  name: "NavMenuConfigView",
  components: {EditNavMenuDialogModal},

  data() {
    return {
      menus: [],
      isLoading: false,
      currentSelectedNode: {},

      updateIdSet: new Set(),
    }
  },

  computed: {
    ...mapGetters('configuration', ['navMenuList']),
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
      console.log(tree.treeToList(this.menus, true));
    },

    getNavMenuTree() {
      this.isLoading = true;

      this.getNavMenus().then(res => {
        if (res.data.data !== null) {
          this.menus = tree.listToTreeOrdered(res.data.data, (a, b) => a.ordinal - b.ordinal);
        }
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
      // console.log('drag start', node);
    },
    // eslint-disable-next-line no-unused-vars
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label);
    },
    // eslint-disable-next-line no-unused-vars
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label);
    },
    // eslint-disable-next-line no-unused-vars
    handleDragOver(draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label);
    },
    // eslint-disable-next-line no-unused-vars
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    // eslint-disable-next-line no-unused-vars
    handleDrop(draggingNode, dropNode, dropType, ev) {
      let sortNode;
      if (dropType === 'inner') {
        draggingNode.data.pid = dropNode.data.id;
        sortNode = dropNode.childNodes;
      } else {
        draggingNode.data.pid = dropNode.data.pid;
        // iterate through parent's children of the drop node
        sortNode = dropNode.parent.childNodes;
      }

      // iterate through drop node children
      sortNode.forEach((d, index) => {
        // if ordinal is different from previous ordinal, add node pk id to set
        if (d.data.ordinal !== index) {
          d.data.ordinal = index;
          this.updateIdSet.add(d.data.id);
        }
      })

      this.updateIdSet.add(draggingNode.data.id);
      this.$forceUpdate();
    },
    // eslint-disable-next-line no-unused-vars
    allowDrop(draggingNode, dropNode, type) {
      return !dropNode.data.leaf || type !== 'inner';
    },
    // eslint-disable-next-line no-unused-vars
    allowDrag(draggingNode) {
      return true;
    },

    saveNodeUpdate() {
      SystemNavMenu.updateNavMenus(tree.treeToList(this.menus, true)
          .filter(item => this.updateIdSet.has(item.id)))
          .finally(() => {
            this.$nextTick(() => {
              this.updateIdSet.clear();
              this.$forceUpdate();
            })
          });
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