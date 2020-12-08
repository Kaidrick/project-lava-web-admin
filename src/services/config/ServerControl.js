import http from 'axios';

export default {
    commandServerRestart({restartTime, reason, resetType}) {
        return http({
            method: 'post',
            url: '/server/control/reload_mission',
            data: {
                restartTime, reason, resetType
            }
        });
    }
}