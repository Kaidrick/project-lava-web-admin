import store from '@/store';

// eslint-disable-next-line no-unused-vars
import {Client, StompConfig, Versions, StompHeaders, IPublishParams} from "@stomp/stompjs";

const frontendExchangeEndpoint = "/app/frontend.exchange";

let url = "wss://localhost:8080/lava-ws/websocket";

/**
 * @type Client
 */
let stomper

let config = new StompConfig();
config.brokerURL = url;
config.beforeConnect = () => {
    console.log("before connect!")
    stomper.connectHeaders = {
        'lava-user-ident': "root"
    }
}
config.heartbeatIncoming = 10000;
config.heartbeatOutgoing = 5000;
config.onWebSocketError = t => console.log("ws error: ", t);
config.onConnect = c => {
    console.log('connected', c)
    store.dispatch('system/test');

    stomper.subscribe("/topic/frontend.bus", msg => {
        console.log("subscribed message", msg)},
        /**
         * @type StompHeaders
         */
        {
            'lava-user-ident': store.getters['system/userName']
        }
    );
}
config.reconnectDelay = 5000;
config.logRawCommunication = true;
config.stompVersions = new Versions(['1.2'])

stomper = new Client(config);
stomper.debug = function(str) {
    console.log(str);
};

// let client = Stomp.over(new SockJs(url));
// let client = Stomp.client(url, ['v12.stomp']);
// client.reconnect_delay = 3000;
// client.activate()

/**
 * Activate Stomp over websocket connection.
 */
function stompActivate() {
    stomper.activate();
}

/**
 * Deactivate the stomp over websocket connection.
 * @returns {Promise<void>}
 */
function stompDeactivate() {
    return stomper.deactivate();
}

/**
 *
 * @param {string} destination Destination string of the subscription
 * @param {Function} callback
 * @param {StompHeaders} headers
 */
function stompSubscribe(destination, callback, headers) {
    stomper.subscribe(destination, callback, headers)
}

/**
 * Unsubscribe from the queue or topic
 * @param {string} subscriptionId
 * @param {StompHeaders} headers
 */
function stompUnsubscribe(subscriptionId, headers) {
    stomper.unsubscribe(subscriptionId, headers);
}

/**
 * Publish/Send message via websocket connection.
 * @param {StompHeaders} headers
 * @param {Uint8Array|string} body
 */
function stompPublish(body, headers) {
    /**
     * @type {IPublishParams}
     */
    const frame = {
        destination: frontendExchangeEndpoint,
        headers
    };

    frame.headers['lava-user-ident'] = store.getters['system/userName']

    if (body instanceof Uint8Array) {
        frame.binaryBody = body;
    } else {
        frame.body = body;
    }

    stomper.publish(frame);
}


export default {

    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.$stomp = {
            activate: stompActivate,
            deactivate: stompDeactivate,
            publish: stompPublish,
            subscribe: stompSubscribe,
            unsubscribe: stompUnsubscribe
        };
    }

}