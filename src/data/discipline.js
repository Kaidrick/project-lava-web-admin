export class PlayerDisciplinaryAction {
    constructor(ucid, punishment, duration, reason, remark) {
        this.ucid = ucid;
        this.punishment = punishment;
        this.duration = duration;
        this.reason = reason;  // the reason provided to a banned player when s/he tries to connect to server
        this.remark = remark;  // a remark field that can be used to take additional notes
    }
}