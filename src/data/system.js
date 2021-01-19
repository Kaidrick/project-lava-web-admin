export class NavMenu {
    constructor(name = '',
                path = '',
                pid = 0,
                leaf = false,
                id = -1,
                menuOrder=0x7FFFFFFF) {
        this.name = name;
        this.path = path;
        this.pid = pid;
        this.leaf = leaf;
        this.id = id;
        this.menuOrder = menuOrder;
    }
}
