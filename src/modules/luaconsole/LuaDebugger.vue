<template>
  <div class="lua-debugger-wrapper mono-wrapper" @click="clearSelection">
    <div class="lua-note-book-wrapper">
      <debug-note class="debug-note"
                  :class="{'selected': selectedNoteIndex === index}"
                  v-for="(command, index) in commands"
                  @click.native="selectDebugNote(index)"
                  ref="debugNote"
                  :key="index"
                  :note-data="command">
        <div slot="operation" class="debug-note-operation" v-if="selectedNoteIndex === index">
          <el-tag class="debug-env-type-tag">
            {{ getDebugTypeName(command.type) }}
          </el-tag>
          <el-button size="mini" @click="$clipboard(command.code)">COPY IN</el-button>
          <el-button size="mini" @click="$clipboard($refs['debugNote'][index].getResponse())">COPY OUT</el-button>
          <el-button size="mini" @click="runDebugRequest(command.code)">RUN</el-button>
          <el-button size="mini" @click="$refs.luaEditor.setValue(command.code)">COPY TO EDITOR</el-button>
          <el-button size="mini" @click="deleteSelection(index)">DELETE NOTE</el-button>
        </div>
      </debug-note>
    </div>
    <div class="lua-editor">
      <lua-editor @keydown.ctrl.enter.native="sendDebugRequest"
                  class="lua-editor__editor-frame"
                  ref="luaEditor"
                  :read-only="false"
                  :is-editor="true" :panel-expanded="isEditorPanelExpanded"></lua-editor>
      <side-bar-control class="lua-editor__editor-control"
                        @send-command="sendDebugRequest"
                        @clear-command="clear"
                        @panel-collapsed="collapsePanel" />
    </div>
  </div>
</template>

<script>
import LuaEditor from "./components/LuaEditor";
import SideBarControl from "./components/SideBarControl";
import DebugNote from "@/modules/luaconsole/components/DebugNote";
import {mapGetters} from 'vuex';


export default {
  name: "LuaDebugger",
  // eslint-disable-next-line vue/no-unused-components
  components: {DebugNote, LuaEditor, SideBarControl},
  data() {
    const debugTypeNameMapping = {
      0: 'Mission',
      1: 'Hook',
      2: 'Export',
      3: 'Trigger'
    };

    return {
      commands: [],
      nextId: 0,
      debugTypeNameMapping,
      selectedNoteIndex: undefined,

      isEditorPanelExpanded: false
    }
  },

  computed: {
    ...mapGetters('debugger', ['debugEnvType'])
  },

  mounted() {

  },

  methods: {
    sendDebugRequest() {
      const command = this.$refs.luaEditor.getValue();

      const note = {
        type: this.debugEnvType,
        index: ++this.nextId,
        code: command,
      };

      this.commands.push(note);

      this.$nextTick(() => {
        this.$refs.luaEditor.focus();
      })
    },

    runDebugRequest(luaString) {
      const note = {
        type: this.debugEnvType,
        index: ++this.nextId,
        code: luaString,
      };

      this.commands.push(note);

      this.$nextTick(() => {
        this.$refs.luaEditor.focus();
      })
    },

    clear() {
      this.commands.splice(0, this.commands.length);
      this.selectedNoteIndex = undefined;
    },

    collapsePanel(isExpanded) {
      this.isEditorPanelExpanded = isExpanded;
    },

    clearSelection(event) {
      console.log(event, "event");
      if(event.target.className === 'lua-note-book-wrapper' ||
          event.target.className.includes('lua-debugger-wrapper')) {
        this.$message.success('outside click');
        this.selectedNoteIndex = undefined;
      }
    },

    deleteSelection(index) {
      this.$message.success('delete index -> ' + index);
      this.commands.splice(index, 1);
      this.selectedNoteIndex = undefined;
    },

    selectDebugNote(index) {
      // this.$message.success('click')
      this.selectedNoteIndex = index;
    },

    getDebugTypeName(type) {
      return this.debugTypeNameMapping[type]
    }
  }

}
</script>

<style lang="scss" scoped>
//@import "src/assets/style/base";
@import "../../assets/style/editor";

.lua-debugger-wrapper {


  .lua-note-book-wrapper {
    .debug-note {
      &.selected {

        border: 1px solid #42b983;
        padding: 9px 9px 9px 4px;
        border-left: 6px solid #42b983;
      }

      .debug-note-operation {
        margin: 10px 10px 0 10px;

        .debug-env-type-tag {
          width: 70px;
          border-radius: 0;
          background-color: $primary_light;
          border: 0;
          color: white;
          margin-right: 10px;
          text-align: center;
          height: 26px;
          line-height: 26px;
        }
      }
    }

  }

  .lua-editor {
    margin: 10px 10px 10px 10px;
    display: flex;
    flex-direction: row;

    .lua-editor__editor-frame {
      width: calc(100% - 150px);
    }

    .lua-editor__editor-control {
      margin-left: 10px;
      width: 150px;
    }
  }
}
</style>