<template>
    <el-dialog :visible.sync="dialogVisible"
               :before-close="close"
               append-to-body
               destroy-on-close
               :title="actionName">
        <div class="discipline-action-content-wrapper">
            <el-input v-model="reason" placeholder="Please specify reason (optional)"></el-input>
            <el-button @click="submitAction" size="small">OK</el-button>
        </div>
    </el-dialog>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import {PlayerDisciplinaryAction} from "@/data/discipline";
    import {mapActions} from 'vuex';
    export default {
        name: "DisciplinaryActionDetail",

        computed: {
            actionName() {
                return this.titleMap[this.actionType];
            },
        },

        data() {
            return {
                actionType: -1,
                playerData: {},

                reason: '',

                verdict: {},

                titleMap: {
                  0: "Send notice to player",
                  1: "TEST",
                  2: "Force player into slot",
                  3: "Destroy player unit",
                  4: "Kick player from server",
                  5: "Ban player from server",
                  6: "OK",
                },

                dialogVisible: false
            }
        },

        methods: {
            ...mapActions('dashboard', ['executeDisciplinaryAction']),

            show(type, playerData) {
                this.actionType = type;
                this.playerData = playerData;

                this.dialogVisible = true;
            },

            close() {
                console.log("close");
                this.dialogVisible = false;
            },

            submitAction() {
                this.executeDisciplinaryAction(new PlayerDisciplinaryAction(
                    this.playerData.ucid,
                    this.actionType,
                    0,
                    this.reason,
                    "No remark"
                ));

                this.dialogVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>