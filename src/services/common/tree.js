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
    listToTreeOrdered(dataset, compareFn=(a, b) => a.id - b.id, idPropertyName = 'id', pidPropertyName = 'pid') {
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
    }
}
