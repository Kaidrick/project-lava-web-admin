import http from 'axios';

export class TelemetryData {
    constructor(missionStateLuaMemory, hookStateLuaMemory, exportStateLuaMemory, timestamp) {
        this.missionStateLuaMemory = missionStateLuaMemory;
        this.hookStateLuaMemory = hookStateLuaMemory;
        this.exportStateLuaMemory = exportStateLuaMemory;
        this.timestamp = timestamp;
    }
}

export default {
    name: 'luaMemoryUsage',

    getLuaStateTelemetry() {
      return http({
          method: 'get',
          url: 'api/telemetry/all'
      })
    }
}