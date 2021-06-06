import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import store from "./store";

// eslint-disable-next-line no-unused-vars
let stompClient, socket;
// eslint-disable-next-line no-unused-vars
let connected = false;
let received_messages = [];

let subscriptions = [];

let type = "topic";
let topicName = "frontend.bus";

let requestPrefix = "app";
let exchangeName = "frontend.exchange";

let stompEndpointUrl = "https://localhost:8080/lava-ws";

let callbacks = {
    success: new Function(),
    fail: new Function(),
}

// eslint-disable-next-line no-unused-vars
function create(url, successCallback, failCallback) {
    socket = new SockJS(url)
    stompClient = Stomp.over(socket);
    stompClient.heartbeat.outgoing = 2000;
    stompClient.heartbeat.incoming = 4000;
    stompClient.reconnect_delay = 5000;

    callbacks.success = successCallback;
    callbacks.fail = failCallback;
}

// eslint-disable-next-line no-unused-vars
function reconnect() {
    stompClient.connect(
        {},
        frame => {
            connected = true;
            console.log("connected");
            console.log(frame);
            let subscription = stompClient.subscribe(`/${type}/${topicName}`, tick => {
                console.log(tick, "frame");
                received_messages.push(JSON.parse(tick.body).content);
            });

            subscriptions.push(subscription);

            callbacks.success && callbacks.success();

            console.log(store);
            store.state.websocketConnected = connected;

            sendPing();
        },
        error => {
            console.log("ws connection error: " + error);
            connected = false;
            store.state.websocketConnected = connected;

            callbacks.fail && callbacks.fail();
        }
    )
}

// eslint-disable-next-line no-unused-vars
function connect(url=stompEndpointUrl, successCallback, failCallback) {
    create(url, successCallback, failCallback);
    reconnect();
}

/**
 * Returns a Subscription
 * @param topic the topic to be subscribed to
 * @param callback function to be called
 * @returns {*} the Subscription object, which contains a string id
 */
function subscribe(topic, callback) {
    const subscription = stompClient.subscribe(topic, callback);
    subscriptions.push(subscription);
    return subscription;
}

function send(message) {
    if (stompClient && stompClient.connected) {
        const msg = { name: message };
        stompClient.send(`/${requestPrefix}/${exchangeName}`, JSON.stringify(msg), {
            // header
        });
    }
}

function sendPing() {
    stompClient.ws.send('\x0A');
}

function sendRaw(message) {
    stompClient.ws.send(message);
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

        Vue.prototype.$wsConnect = connect;

        Vue.prototype.$wsSend = send;

        Vue.prototype.$wsDisconnect = disconnect;

        Vue.prototype.$wsSubscribe = subscribe;

        Vue.prototype.$wsPing = sendPing;

        Vue.prototype.$wsSendRaw = sendRaw;

        Vue.prototype.$wsReconnect = reconnect;
    }

}