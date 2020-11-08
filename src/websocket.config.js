'use strict';

const host = 'localhost';
const port = '8080';
const entryMessageMapping = 'hello';
const appDestinationPrefix = 'app';
const stompEndpoint = 'lava-ws';

module.exports = {
    option: {
        host, port, entryMessageMapping, appDestinationPrefix, stompEndpoint
    },

    topics: {
        systemLog: '/topic/backend.entry',
        playerList: '/topic/player.connection',
    }
};