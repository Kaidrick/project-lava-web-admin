<script>
  import tree from "@/services/common/tree";
  export default {
    name: "SystemSideNavMenu",

    props: {
      menus: {
        type: Array
      }
    },

    data() {
      return {
        selectedMenu: -1
      }
    },

    methods: {
      handleNavMenuClick(_, path) {
        this.selectedMenu = this.menus.find(m => m.path === path.path).id;
        const targetRoute = this.$router.options.routes.find(r => r.path === path.path);

        this.$router.push(targetRoute).catch(() => {
          console.log(`router view already in ${path.path}`)
        });
      }
    },

    mounted() {
      // this.selectedMenu = this.menus.find(m => m.path === this.$route.path).id;

      // this.selectedMenu = Array.from(this.menus.map(m => m.name)).indexOf(this.$route.name);
    },

    // eslint-disable-next-line no-unused-vars
    render(h, context) {
      const menuGen = arr => {
        const res = [];

        for (const item of arr.sort((a, b) => a.ordinal - b.ordinal)) {
          if (Array.isArray(item.children) && item.children.length > 0) {
            res.push(
                <el-submenu index={String(item.id)} key={item.id} ordinal={item.ordinal}>
                  <template slot="title">
                    <span>{item.name}</span>
                  </template>
                  { menuGen(item.children) }
                </el-submenu>
            )
          } else {
            res.push(
                <el-menu-item index={String(item.id)}
                              key={item.id}
                              ordinal={item.ordinal}
                              class={(item.id === this.selectedMenu) ? 'is-selected' : ''}
                              onClick={click => this.handleNavMenuClick(click, item)}>
                  <span>{item.name}</span>
                </el-menu-item>
            )
          }
        }

        return res;
        // const sres = res.sort((a, b) => a.data.attrs.ordinal - b.data.attrs.ordinal);
        // console.log(sres)
        // return res.sort((a, b) => a.data.attrs.ordinal - b.data.attrs.ordinal);
      }

      const pass = <el-menu class="nav-menu-vertical"
                      // default-active={String(this.selectedMenu)}
                      text-color="#fff">
        { menuGen(tree.listToTree(this.menus)) }
      </el-menu>

      console.log(pass);

      return pass;
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

  .el-submenu .el-menu-item {
    min-width: auto;
  }

  ::v-deep .el-submenu__title:hover {
    background-color: $primary_light;
  }

  .nav-menu-wrapper {
    height: auto !important;

    .nav-menu-vertical {
      height: auto !important;
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

        background-color: $primary;
      }

      .lava-info-bar {

      }
    }
  }
</style>