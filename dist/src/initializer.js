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
import { options } from './utils';
import IDStore from './mmkv/IDStore';
import mmkvJsiModule from './module';
export var currentInstancesStatus = {};
/**
 * Get current instance ID status for instances
 * loaded since application started
 */
export function getCurrentMMKVInstanceIDs() {
    return __assign({}, currentInstancesStatus);
}
/**
 *
 * Initialize function is used to create
 * the storage or load the storage if
 * it already exists with the given options.
 *
 */
export function initialize(id) {
    var opts = options[id];
    opts.logs = [];
    opts.logs.push('Initialize: started');
    if (!mmkvJsiModule.setupMMKVInstance) {
        opts.logs.push('Error: mmkvJsiModule.setupMMKVInstance is not a function');
        opts.callback && opts.callback(opts.logs.join('\n'));
        return false;
    }
    if (opts.serviceName && opts.alias && mmkvJsiModule.setMMKVServiceName) {
        mmkvJsiModule.setMMKVServiceName(opts.alias, opts.serviceName);
    }
    if (IDStore.exists(id)) {
        opts.logs.push('status: storage instance already exists');
        if (!IDStore.encrypted(id)) {
            opts.logs.push('status: storage instance is not encrypted, initialize without encryption');
            return initWithoutEncryption(opts);
        }
        opts.alias = IDStore.getAlias(id);
        opts.logs.push("status: alias:".concat(!!opts.alias, ", trying to init existing instance with old key"));
        return initWithEncryptionUsingOldKey(opts);
    }
    if (!opts.initWithEncryption) {
        return initWithoutEncryption(opts);
    }
    if (!opts.secureKeyStorage) {
        return initWithEncryptionWithoutSecureStorage(opts);
    }
    if (opts.alias && !mmkvJsiModule.secureKeyExists(opts.alias)) {
        opts.logs.push("status: new encrypted instance, trying to init for the first time with encryption");
        return initWithEncryptionUsingNewKey(opts);
    }
    opts.logs.push("status: trying to load the storage");
    return initWithEncryptionUsingOldKey(opts);
}
/**
 * Usually after first creation of the
 * storage, your database will be
 * initialized with its old key stored
 * in the secure storage.
 *
 */
function initWithEncryptionUsingOldKey(options) {
    if (!options.alias) {
        options.logs.push('Error: Trying to init encrypted storage without alias');
        options.callback && options.callback(options.logs.join('\n'));
        return false;
    }
    var key = mmkvJsiModule.getSecureKey(options.alias);
    options.logs.push("status: key: ".concat(!!key, " alias:").concat(!!options.alias));
    if (key) {
        options.logs.push("status: key found for storage");
        options.key = key;
        return setupWithEncryption(options);
    }
    options.logs.push("Error: key does not exist in keychain");
    options.callback && options.callback(options.logs.join('\n'));
    return false;
}
/**
 * For first creation of storage
 * this function is called when
 * you are encrypting it on initialzation
 *
 */
function initWithEncryptionUsingNewKey(options) {
    if (!options.key || options.key.length < 3)
        throw new Error('Key is null or too short');
    if (!options.alias) {
        options.logs.push('Error: Trying to init new encrypted storage without alias');
        options.callback && options.callback(options.logs.join('\n'));
        return false;
    }
    mmkvJsiModule.setSecureKey(options.alias, options.key, options.accessibleMode);
    options.logs.push('status: Saved new secure key');
    return setupWithEncryption(options);
}
/**
 * It is possible that the user does not
 * want to store the key in secure storage.
 * In such a case, this function will
 * be called to encrypt the storage.
 *
 */
function initWithEncryptionWithoutSecureStorage(options) {
    if (!options.key || options.key.length < 3)
        throw new Error('Key is null or too short');
    if (!options.alias)
        return false;
    return setupWithEncryption(options);
}
/**
 *
 * When you want to initialize the storage
 * without encryption this function is called.
 *
 */
function initWithoutEncryption(options) {
    return setup(options);
}
function setup(options) {
    var id = options.instanceID;
    var ready = mmkvJsiModule.setupMMKVInstance(id, options.processingMode, '', '');
    options.logs.push("status: ready: ".concat(ready));
    if (!IDStore.exists(id)) {
        mmkvJsiModule.setBoolMMKV(id, true, id);
        IDStore.add(id, false, null);
        options.callback && options.callback(options.logs.join('\n'));
        options.logs.push("status: instance verified");
        return true;
    }
    else {
        if (mmkvJsiModule.containsKeyMMKV(id, id)) {
            options.logs.push("status: instance verified");
            options.callback && options.callback(options.logs.join('\n'));
            return true;
        }
        else {
            options.logs.push("status: Could not verify instance");
            return encryptionHandler(options);
        }
    }
}
function setupWithEncryption(options) {
    if (!options.key)
        return false;
    var id = options.instanceID;
    var ready = mmkvJsiModule.setupMMKVInstance(options.instanceID, options.processingMode, options.key, '');
    options.logs.push("status: Encrypted instance loaded ".concat(ready, ", verifying"));
    if (!IDStore.exists(id)) {
        mmkvJsiModule.setBoolMMKV(id, true, id);
        IDStore.add(id, true, options.alias);
        options.logs.push('status: Encrypted instance loaded and verified');
        options.callback && options.callback(options.logs.join('\n'));
        return true;
    }
    else {
        if (mmkvJsiModule.containsKeyMMKV(id, id)) {
            options.logs.push('status: Encrypted instance loaded and verified');
            options.callback && options.callback(options.logs.join('\n'));
            return true;
        }
        else {
            options.logs.push('status: Encrypted instance loaded was loaded but not verified. Trying to resolve storage again');
            return encryptionHandler(options);
        }
    }
}
/**
 * When a storage instance is encrypted at runtime, this functions
 * helps in detecting and loading the instance properly.
 */
function encryptionHandler(options) {
    var id = options.instanceID;
    var alias = IDStore.getAlias(id);
    options.logs.push("status eh: alias: ".concat(!!alias));
    if (!alias) {
        options.logs.push("status eh: alias not found");
        options.callback && options.callback(options.logs.join('\n'));
        return mmkvJsiModule.setupMMKVInstance(id, options.processingMode, '', '');
    }
    var exists = mmkvJsiModule.secureKeyExists(alias);
    var key = exists && mmkvJsiModule.getSecureKey(alias);
    options.logs.push("status eh: key exists: ".concat(exists, " key: ").concat(!!key));
    if (IDStore.encrypted(id) && key) {
        options.key = key;
        options.logs.push("status eh: loading instance with key");
        options.callback && options.callback(options.logs.join('\n'));
        return mmkvJsiModule.setupMMKVInstance(id, options.processingMode, options.key, '');
    }
    else {
        options.logs.push("status eh: loading instance without key, not encrypted");
        options.callback && options.callback(options.logs.join('\n'));
        return mmkvJsiModule.setupMMKVInstance(id, options.processingMode, '', '');
    }
}
