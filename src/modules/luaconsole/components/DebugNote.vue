<template>
  <div class="debug-note-wrapper">
    <div class="command">
      <div class="note-index">In [{{ index }}]: </div>
      <lua-editor class="note-display" :is-editor="false" :src="noteData.code" :read-only="true"></lua-editor>
    </div>
    <div v-if="response" class="response">
      <div class="note-index">Out [{{ index }}]: </div>

      <!-- TODO: estimate the type of response; text or code -->
      <lua-editor class="note-display" :is-editor="false" :src="response" :read-only="true"></lua-editor>
    </div>
    <slot name="operation"></slot>
  </div>
</template>

<script>
  import LuaEditor from "@/modules/luaconsole/components/LuaEditor";
  import LuaDebugService from "../../../services/LuaDebugService";
  export default {
    name: "DebugNote",
    components: {LuaEditor},
    computed: {
      code() {
        return this.noteData.code;
      },
      index() {
        return this.noteData.index;
      },
    },

    props: {
      noteData: {},
    },

    data() {
      return {
        response: ''
      }
    },

    mounted() {
      // console.log(this.noteData.code);

      // push to message queue
      this.$stomp.publish()

      LuaDebugService.sendLuaDebugString({
        luaString: this.noteData.code,
        level: this.noteData.type,
        timeStamp: new Date(),
      }).then(res => {
        this.response = res.data.data;
      });
    },

    methods: {
      getResponse() {
        return this.response;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/assets/style/color-scheme';
  .debug-note-wrapper {
    padding: 10px;
    margin: 10px 10px 20px 10px;

    &:hover {
      /*border: 1px solid #42b983;*/
      /*padding: 9px 9px 9px 4px;*/
      /*border-left: 6px solid #42b983;*/
      background-color: darken($primary_light, 12);
    }

    &:hover::before{
      width: 4px;
      background-color: #ebb563;
      content: "";
      position: absolute;
    }

    .command, .response {
      display: flex;

      .note-index {
        width: 80px;
        text-align: right;
        padding-right: 10px;
      }

      .note-display {
        width: calc(100% - 90px);
      }

      .note-result {
        flex: 1;
      }
    }
    .command {
      margin-bottom: 10px;
    }
  }
</style>