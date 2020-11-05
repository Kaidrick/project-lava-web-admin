import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

// eslint-disable-next-line no-unused-vars
let stompClient, socket;
// eslint-disable-next-line no-unused-vars
let connected = false;
let received_messages = [];

let type = "topic";
let topicName = "frontend.bus";

let requestPrefix = "app";
let exchangeName = "frontend.exchange";

let stompEndpointUrl = "http://localhost:8080/lava-ws";

// eslint-disable-next-line no-unused-vars
function connect(url=stompEndpointUrl, successCallback, failCallback) {
    socket = new SockJS(url);
    stompClient = Stomp.over(socket);
    stompClient.connect(
        {},
        frame => {
            connected = true;
            console.log("connected")
            console.log(frame);
            stompClient.subscribe(`/${type}/${topicName}`, tick => {
                // console.log(tick, "frame");
                received_messages.push(JSON.parse(tick.body).content);
            });

            successCallback && successCallback();
        },
        error => {
            console.log("ws connection error: " + error);
            connected = false;

            failCallback && failCallback();
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
    if (stompClient && stompClient.connected) {
        const msg = { name: message };
        stompClient.send(`/${requestPrefix}/${exchangeName}`, JSON.stringify(msg), {
            // header
        });
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