<template>
  <el-dialog title="Add New Navigation Menu"
             :before-close="handleDialogClose"
             :close-on-click-modal="true"
             width="400px"
             :visible.sync="dialogVisible">
    <div class="add-new-nav-menu-content-wrapper">
      <el-form ref="navMenuForm" class="nav-menu-form" :model="navMenuForm">
        <el-form-item class="nav-menu-form__input-item" label="Menu Name" prop="name">
          <el-input v-model="navMenuForm.name"></el-input>
        </el-form-item>
        <el-form-item class="nav-menu-form__input-item" label="Type" prop="leaf">
          <el-switch v-model="navMenuForm.leaf" active-text="Leaf" inactive-text="Menu"></el-switch>
        </el-form-item>
        <el-form-item v-if="navMenuForm.leaf" class="nav-menu-form__input-item" label="Menu Path" prop="path">
          <el-autocomplete
              class="nav-menu-form__autocomplete"
              popper-class="nav-menu-form__autocomplete-item"
              clearable
              v-model="navMenuForm.path"
              :fetch-suggestions="querySearch"
              placeholder="View path"
              :trigger-on-focus="true"
              @select="select => navMenuForm.path = select.path">
            <template slot-scope="{ item }">
              <div class="name">{{ item.name }}</div>
              <span class="path">{{ item.path }}</span>
            </template>
          </el-autocomplete>
<!--          <el-input v-model="navMenuForm.path"></el-input>-->
        </el-form-item>
        <el-form-item class="nav-menu-form__input-item" label="Parent Menu" prop="pid">
          <el-select v-model="navMenuForm.pid">
            <el-option label="N/A" :value="0">N/A</el-option>
            <el-option v-for="(menu, index) in navMenuList.filter(m => !m.leaf)" :label="menu.name" :key="index" :value="menu.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="submitForm">SUBMIT</el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { NavMenu } from "@/data/system";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "EditNavMenuDialogModal",
  data() {
    return {
      navMenuForm: new NavMenu(),
      dialogVisible: false,
    }
  },

  computed: {
    ...mapGetters('configuration', ['navMenuList']),
  },

  methods: {
    ...mapActions('configuration', ['addNavMenu']),

    show(data) {
      if (data) {
        return true
      }

      this.dialogVisible = true;
    },

    querySearch(queryString, callback) {
      const routes = this.$router.options.routes
      console.log(routes);
      const result = queryString ? routes.filter(r => r.path.includes(queryString)) : routes;
      console.log(result);
      callback(result);
    },

    submitForm() {
      if (!this.navMenuForm.leaf) {
        this.navMenuForm.path = undefined;
      }
      this.addNavMenu(this.navMenuForm).then(res => {
        if (res.data.success) {
          this.$emit('submit')

          this.handleDialogClose();
        }
      });
    },

    handleDialogClose() {
      this.dialogVisible = false;
      this.$refs.navMenuForm.resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav-menu-form__autocomplete-item {
    .name {
      font-weight: bold;
    }

    .path {
      color: #42b983;
    }
  }

  .add-new-nav-menu-content {
    .nav-menu-form {
      .nav-menu-form__input-item {
        .nav-menu-form__autocomplete {

        }
      }
    }
  }
</style>