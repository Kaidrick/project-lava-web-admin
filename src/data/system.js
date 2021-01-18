export class NavMenu {
    constructor(name = '',
                path = '',
                pid = 0,
                leaf = false,
                id = -1) {
        this.name = name;
        this.path = path;
        this.pid = pid;
        this.leaf = leaf;
        this.id = id;
    }
}
