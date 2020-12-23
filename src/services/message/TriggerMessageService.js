import http from 'axios';

export default {
    sendTriggerMessage(messageRequest) {
        return http({
            method: 'post',
            url: 'trigger/message',
            data: messageRequest
        });
    },
}