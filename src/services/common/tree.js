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
    }
}
