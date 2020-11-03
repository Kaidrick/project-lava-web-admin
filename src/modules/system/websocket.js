import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

// eslint-disable-next-line no-unused-vars
let stompClient, socket;
// eslint-disable-next-line no-unused-vars
let connected = false;
let received_messages = [];

function connect(url) {
    socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            connected = true;
            console.log("connected")
            console.log(frame);
            stompClient.subscribe("/topic/greetings", tick => {
                console.log(tick);
                received_messages.push(JSON.parse(tick.body).content);
            });
        },
        error => {
            console.log(error);
            connected = false;
        }
    );
}

function send(message) {
    console.log("Send message:" + message);
    if (stompClient && stompClient.connected) {
        console.log("inside ok")
        const msg = { name: message };
        stompClient.send("/app/hello", JSON.stringify(msg), {});
    }
}

function disconnect() {
    if (stompClient) {
        stompClient.disconnect();
    }
    connected = false;
}

export default {

    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        // Vue.mixin({
        //     created() {
        //         console.log("Websocket");
        //     }
        // });

        Vue.prototype.$wsConnect = connect

        Vue.prototype.$wsSend = send

        Vue.prototype.$wsDisconnect = disconnect
    }

}