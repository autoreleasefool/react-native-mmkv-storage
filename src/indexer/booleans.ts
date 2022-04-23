import { handleActionAsync, handleAction } from '../handlers';
import mmkvJsiModule from '../module';
import { GenericReturnType, Index } from '../types';
const INDEX_TYPE = 'boolIndex';

/**
 * Index of all boolean values stored in storage.
 */
export default class boolIndex implements Index<boolean> {
  instanceID: string;
  constructor(id: string) {
    this.instanceID = id;
  }
  /**
   * Get all keys
   */
  async getKeys() {
    return await handleActionAsync(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
  }

  /**
   * Check if a key exists.
   */
  hasKey(key: string) {
    let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
    return keys ? keys.indexOf(key) > -1 : false;
  }

  /**
   * Get all boolean values from storage
   */
  async getAll() {
    return new Promise<GenericReturnType<boolean>[]>(resolve => {
      let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
      if (!keys) keys = [];
      let items: GenericReturnType<boolean>[] = [];
      for (let i = 0; i < keys.length; i++) {
        items.push([keys[i], mmkvJsiModule.getBoolMMKV(keys[i], this.instanceID)]);
      }
      resolve(items);
    });
  }
}
