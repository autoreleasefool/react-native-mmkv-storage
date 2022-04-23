import { handlers } from './constants';
export var getDataType = function (value) {
    if (value === null || value === undefined)
        return null;
    if (Array.isArray(value))
        return 'array';
    var type = typeof value;
    switch (type) {
        case 'boolean':
        case 'number':
        case 'object':
        case 'string':
            return type;
        case 'bigint':
        case 'function':
        case 'symbol':
        case 'undefined':
            return null;
    }
};
export var getInitialValue = function (key, storage) {
    return getInitialProperty(key, storage, 'value');
};
export var getInitialValueType = function (key, storage) {
    return getInitialProperty(key, storage, 'type');
};
var getInitialProperty = function (key, storage, property) { return function () {
    if (!(storage === null || storage === void 0 ? void 0 : storage.indexer)) {
        return null;
    }
    var indexer = storage.indexer;
    if (indexer.hasKey(key)) {
        var type = void 0;
        for (type in handlers) {
            var dataIndex = handlers[type].dataIndexer(indexer);
            if (dataIndex.hasKey(key)) {
                if (property === 'value') {
                    return handlers[type].getter(storage)(key);
                }
                else {
                    return type;
                }
            }
        }
    }
    return null;
}; };
