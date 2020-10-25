import http from 'axios';

export default {
    name: 'atlasMap',

    getMapTile(theater, level, x, y) {
        return http({
            method: 'get',
            url: `atlas/${theater}/${level}/${x}/${y}`,
            responseType: 'arraybuffer'
        });
    }
}