<template>
  <div class="debug-note-wrapper">
    <div class="command">
      <div class="note-index">In [{{ index }}]: </div>
      <lua-editor class="note-display" :is-editor="false" :src="code" :read-only="true"></lua-editor>
    </div>
    <div v-if="response" class="response">
      <div class="note-index">Out [{{ index }}]: </div>

      <!-- TODO: estimate the type of response; text or code -->
      <lua-editor class="note-display" :is-editor="false" :src="response" :read-only="true"></lua-editor>
<!--      <div class="note-result">-->
<!--        {{ response }}-->
<!--      </div>-->
    </div>
    <slot name="operation"></slot>
  </div>
</template>

<script>
  import LuaEditor from "@/modules/luaconsole/components/LuaEditor";
  export default {
    name: "DebugNote",
    components: {LuaEditor},
    computed: {
      code() {
        return this.noteData.code;
      },
      response() {
        return this.noteData.response;
      },
      index() {
        return this.noteData.index;
      },
    },

    props: {
      noteData: {},
    },

    mounted() {

    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .debug-note-wrapper {
    padding: 10px;
    margin: 10px 10px 20px 10px;

    &:hover {
      border: 1px solid #42b983;
      padding: 9px 9px 9px 4px;
      border-left: 6px solid #42b983;
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