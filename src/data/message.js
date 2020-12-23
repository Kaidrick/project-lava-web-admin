export class TriggerMessageRequest {
    constructor(message = '',
                type = 0,
                ucidList = [],
                clearView = false,
                duration = 10,
                useTriggerMessageWhenPossible = true) {
        this.message = message;
        this.type = type;
        this.ucidList = ucidList;
        this.clearView = clearView;  // the reason provided to a banned player when s/he tries to connect to server
        this.duration = duration;  // a remark field that can be used to take additional notes
        this.useTriggerMessageWhenPossible = useTriggerMessageWhenPossible;
    }
}