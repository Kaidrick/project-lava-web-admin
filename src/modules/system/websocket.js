import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

// eslint-disable-next-line no-unused-vars
let stompClient, socket;
// eslint-disable-next-line no-unused-vars
let connected = false;
let received_messages = [];

let type = "topic";
let topicName = "greetings";
let requestPrefix = "app";
let exchangeName = "frontend.exchange";

let stompEndpointUrl = "http://localhost:8080/lava-ws";

function connect(url=stompEndpointUrl) {
    socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            connected = true;
            console.log("connected")
            console.log(frame);
            stompClient.subscribe(`/${type}/${topicName}`, tick => {
                console.log(tick, "tick");
                received_messages.push(JSON.parse(tick.body).content);
            });
        },
        error => {
            console.log(error);
            connected = false;
        }
    );
}

/**
 * Returns a Subscription
 * @param topic the topic to be subscribed to
 * @param callback function to be called
 * @returns {*} the Subscription object, which contains a string id
 */
function subscribe(topic, callback) {
    return stompClient.subscribe(topic, callback)
}

function send(message) {
    console.log("Send message:" + message);
    if (stompClient && stompClient.connected) {
        const msg = { name: message };
        stompClient.send(`/${requestPrefix}/${exchangeName}`, JSON.stringify(msg), {});
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
        console.log(options);

        Vue.prototype.$wsConnect = connect

        Vue.prototype.$wsSend = send

        Vue.prototype.$wsDisconnect = disconnect

        Vue.prototype.$wsSubscribe = subscribe
    }

}