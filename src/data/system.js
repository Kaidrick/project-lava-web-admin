export class NavMenu {
    constructor(name = '',
                path = '',
                pid = 0,
                isLeaf = false,
                id = -1) {
        this.name = name;
        this.path = path;
        this.pid = pid;
        this.isLeaf = isLeaf;
        this.id = id;
    }
}