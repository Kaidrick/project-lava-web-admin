<script>
    // eslint-disable-next-line no-unused-vars
    import ServerControl from "@/services/config/ServerControl";

    export default {
        methods: {
            restartServer(data) {
                alert("restart server. reason: " + JSON.stringify(data));
                // ServerControl.commandServerRestart(data);
            }
        }
    }
</script>
