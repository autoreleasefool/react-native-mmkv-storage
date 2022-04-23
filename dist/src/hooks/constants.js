var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var stringHandler = {
    dataIndexer: function (indexer) { return indexer.strings; },
    getter: function (storage) { return storage.getString; },
    setter: function (storage) { return storage.setString; },
    copy: function (value) { return value; }
};
var numberHandler = {
    dataIndexer: function (indexer) { return indexer.numbers; },
    getter: function (storage) { return storage.getInt; },
    setter: function (storage) { return storage.setInt; },
    copy: function (value) { return value; }
};
var booleanHandler = {
    dataIndexer: function (indexer) { return indexer.booleans; },
    getter: function (storage) { return storage.getBool; },
    setter: function (storage) { return storage.setBool; },
    copy: function (value) { return value; }
};
var arrayHandler = {
    dataIndexer: function (indexer) { return indexer.arrays; },
    getter: function (storage) { return storage.getArray; },
    setter: function (storage) { return storage.setArray; },
    copy: function (value) { return __spreadArray([], value, true); }
};
var objectHandler = {
    dataIndexer: function (indexer) { return indexer.maps; },
    getter: function (storage) { return storage.getMap; },
    setter: function (storage) { return storage.setMap; },
    copy: function (value) { return (__assign({}, value)); }
};
export var handlers = {
    string: stringHandler,
    number: numberHandler,
    boolean: booleanHandler,
    object: objectHandler,
    array: arrayHandler
};
