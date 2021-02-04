export default {
    // eslint-disable-next-line no-unused-vars
    listToTree(dataset, idPropertyName = 'id', pidPropertyName = 'pid') {
        const hashTable = Object.create(null);
        dataset.forEach(aData => hashTable[aData[idPropertyName]] = {...aData, children: []});
        const dataTree = [];
        dataset.forEach(aData => {
            if (aData[pidPropertyName]) {
                hashTable[aData[pidPropertyName]].children.push(hashTable[aData[idPropertyName]])
            } else {
                dataTree.push(hashTable[aData[idPropertyName]])
            }
        });
        return dataTree;
    },

    // eslint-disable-next-line no-unused-vars
    listToTreeOrdered(dataset, compareFn = (a, b) => a.id - b.id, idPropertyName = 'id', pidPropertyName = 'pid') {
        const hashTable = Object.create(null);
        dataset.forEach(aData => hashTable[aData[idPropertyName]] = {...aData, children: []});
        const dataTree = [];
        dataset.forEach(aData => {
            if (aData[pidPropertyName]) {
                hashTable[aData[pidPropertyName]].children.push(hashTable[aData[idPropertyName]]);
                hashTable[aData[pidPropertyName]].children.sort(compareFn);
            } else {
                dataTree.push(hashTable[aData[idPropertyName]])
            }
        });
        return dataTree.sort(compareFn);
    },

    treeToList(item, excludeChildren) {
        const array = [];
        this.flatMapToList(item, array, excludeChildren);
        return array;
    },

    flatMapToList(item, array, excludeChildren) {
        item && item.length > 0 &&
        item.forEach(i => {
            const b = JSON.parse(JSON.stringify(i));
            if (excludeChildren) {
                delete b.children;
            }
            array.push(b);
            if (i.children && i.children.length > 0) {
                this.flatMapToList(i.children, array, excludeChildren)
            }
        });
    }
}
