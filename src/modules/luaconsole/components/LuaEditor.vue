<template>
  <div class="editor-wrapper">
    <div ref="editor" :class="{'note-mode': !this.isEditor, 'expanded': this.panelExpanded}"></div>
    <!--    <div class="cm-s-darcula" ref="hold"></div>-->
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror';
// eslint-disable-next-line no-unused-vars
import * as runMode from 'codemirror/addon/runmode/runmode';
// eslint-disable-next-line no-unused-vars
import * as Lua from 'codemirror/mode/lua/lua';

export default {
  name: "LuaEditor",

  props: {
    readOnly: {
      type: Boolean,
      default: false
    },

    src: {
      type: String,
      default: ''
    },

    isEditor: {
      type: Boolean,
      default: false
    },

    panelExpanded: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      editor: CodeMirror,
      isLoading: false,
    }
  },

  mounted() {
    const options = {
      value: "",
      mode: "lua",
      theme: "darcula",
      lineNumbers: this.isEditor,
      autoRefresh: true,
      readOnly: this.readOnly,
      // lineSeparator: "\n"
    };

    if (!this.editor) {
      options.viewportMargin = Infinity
    }

    this.editor = CodeMirror(this.$refs.editor, options);

    this.editor.setValue(this.src);

    // this.editor = CodeMirror(document.getElementById("codeeditor"), {
    //   value: "",
    //   mode: "lua",
    //   theme: "darcula",
    //   lineNumbers: true,
    //   autoRefresh: true
    // });
    this.editor.refresh();

    this.isEditor && this.editor.focus();
  },

  methods: {
    getValue() {
      return this.editor.getValue();
    },

    setValue(text) {
      this.editor.setValue(text);
    },

    focus() {
      this.editor.focus();
    },

    expand() {

    },

    collapse() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~codemirror/lib/codemirror.css';
@import '../../../assets/style/editor';

::v-deep .note-mode {
  .CodeMirror {
    height: auto;

    .CodeMirror-scroll {
      min-height: auto;
    }
  }
}

::v-deep .expanded {
  .CodeMirror {
    height: auto;

    .CodeMirror-scroll {
      min-height: 300px;
      max-height: 600px;
    }
  }
}


//::v-deep .cm-s-darcula {
//  &.note-mode {
//    height: auto;
//  }
//}

</style>