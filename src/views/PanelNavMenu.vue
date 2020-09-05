<template>
  <div class="nav-menu-wrapper">
    <el-menu
        default-active="0"
        class="nav-menu-vertical"
        text-color="#fff"
        @select="handleMenuSelect"
        active-text-color="#f7b500">
      <el-menu-item @click="handleMenuClick(routeName)"
                    :class="{'is-selected': index === selectedMenu}"
                    v-for="(routeName, index) in navMenus"
                    :key="index" :index="String(index)">
        {{ $t(routeName) }}
      </el-menu-item>
      <!-- Lava icon and versions -->
      <div class="lava-info-bar">
        <div class="lava-logo"/>
        <div>Project Lava</div>
        <div>v0.0.1 Alpha</div>
        <div>DCS Version</div>
        <div>DCS.2.5.6</div>
      </div>

    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "PanelNavMenu",

    data() {
      return {
        image: "'../assets/green_bat.png'",
        navMenus: [],
        routeNamePathMap: new Map(),
        selectedMenu: 0
      }
    },

    mounted() {
      this.$router.options.routes.forEach(r => {
        console.log(r);
        let { name, path } = r;
        this.navMenus.push(name);
        this.routeNamePathMap.set(name, path);
      })
    },

    methods: {
      handleMenuClick(name) {
        let path = this.routeNamePathMap.get(name).toString();
        // console.log(selectedMenu.$route.name, selectedMenu.$route.fullPath);
        this.$router.push({
          name, path
        }).catch(() => {
          console.log(`router view already in ${path}`)
        });
      },
      handleMenuSelect(select) {
        this.selectedMenu = Number(select);
      }
    }
  }
</script>

<style lang="scss" scoped>
 .lava-logo {
   margin: 20px auto;
   width: 100px;
   height: 100px;
   background: url("~@/assets/green_bat.png") center center no-repeat;
   background-size: 100px auto;
 }

  .nav-menu-wrapper {
    height: 100%;

    .nav-menu-vertical {
      height: 100%;
      background-color: #35495e;
      border: 0;

      li {
        &:hover {
          background-color: #2c3e50;
        }

        &.is-selected {

          background-color: #2c3e50;

          &::after {
            content: "";
            height: 100%;
            width: 5px;
            background-color: #f7b500;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }

      .lava-info-bar {

      }


    }

    &::after {
      content: "";
      height: 50px;
      width: 50px;
      background-color: #f7b500;
      position: absolute;
      bottom: 10px;
      left: 50%
    }

  }
</style>