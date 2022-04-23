import { handleActionAsync, handleAction } from '../handlers';
import mmkvJsiModule from '../module';
import { GenericReturnType, Index } from '../types';

const INDEX_TYPE = 'numberIndex';
/**
 * Index of all numbers stored in storage.
 */
export default class numbersIndex implements Index<number> {
  instanceID: string;
  constructor(id: string) {
    this.instanceID = id;
  }

  /**
   *
   * Get all keys
   */
  async getKeys() {
    return await handleActionAsync(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
  }

  /**
   * Check if a key exists
   */
  hasKey(key: string) {
    let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
    return keys ? keys.indexOf(key) > -1 : false;
  }

  /**
   * Get all numbers from storage
   */
  async getAll() {
    return new Promise<GenericReturnType<number>[]>(resolve => {
      let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
      if (!keys) keys = [];
      let items: GenericReturnType<number>[] = [];
      for (let i = 0; i < keys.length; i++) {
        items.push([keys[i], mmkvJsiModule.getNumberMMKV(keys[i], this.instanceID)]);
      }
      resolve(items);
    });
  }
}
