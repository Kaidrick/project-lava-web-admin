<template>
  <div class="nav-menu-wrapper">
    <el-scrollbar style="height: 100%">
      <div>
        <el-button @click="testLogout">LOGOUT</el-button>
      </div>
      <system-side-nav-menu :menus="navMenuList"></system-side-nav-menu>
      <div class="lava-info-bar text-center">
        <div class="lava-logo"/>
        <div>Project Lava</div>
        <div>v0.0.1 Alpha</div>
        <div>DCS Version</div>
        <div>DCS.2.5.6</div>
      </div>
      <div>
        WS Connected: {{ websocketConnected }}
      </div>
    </el-scrollbar>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import SystemSideNavMenu from "@/views/SystemSideNavMenu";
  export default {
    name: "PanelNavMenu",
    components: {SystemSideNavMenu},
    data() {
      return {
        image: "'../assets/green_bat.png'",
        navMenus: [],
        // routeNamePathMap: new Map(),
        selectedMenu: 0
      }
    },

    computed: {
      ...mapGetters('system', ["websocketConnected", "systemRouteMap"]),
      ...mapGetters('configuration', ["navMenuList"]),
    },

    mounted() {
      // this.$router.options.routes.forEach(r => {
      //   // console.log(r);
      //   let { name, path } = r;
      //   this.navMenus.push(name);
      //   this.routeNamePathMap.set(name, path);
      // });
      // console.log(this.routeNamePathMap, "route name map");

      // update system routes array
      this.freshSystemRouteMap();

      this.getNavMenus();
      console.log(this.navMenuList);

      // check path of each route and group by each root
      // this.routeNamePathMap.forEach((k, v) => {
      //   console.log(k, v)
      //   console.log(k.split("/").splice(1));
      // });

      // this.selectedMenu = Array.from(this.routeNamePathMap.keys()).indexOf(this.$route.name);
      this.selectedMenu = Array.from(this.systemRouteMap.keys()).indexOf(this.$route.name);

      // console.log(this.$refs.mainNavMenu);
    },

    methods: {
      ...mapActions('system', ['freshSystemRouteMap', 'reset']),
      ...mapActions('configuration', ['getNavMenus']),

      testLogout() {
        // request api

        // if api call success, remove access token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // finally set mask, clean store, or refresh page
        this.reset();
      },

      handleMenuClick(name) {
        // let path = this.routeNamePathMap.get(name).toString();
        let path = this.systemRouteMap.get(name).toString();
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
  @import 'src/assets/style/color-scheme';

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
      background-color: $primary;
      border: 0;

      li {
        &:hover {
          background-color: $primary_light;
        }

        &.is-selected {

          background-color: $primary_dark;

          &::after {
            content: "";
            height: 100%;
            width: 5px;
            background-color: $accent;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }

      .lava-info-bar {

      }
    }
  }
</style>