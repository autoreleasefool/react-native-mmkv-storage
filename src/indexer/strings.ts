import { handleAction, handleActionAsync } from '../handlers';
import mmkvJsiModule from '../module';
import { GenericReturnType, Index } from '../types';
const INDEX_TYPE = 'stringIndex';
/**
 * Index of all string values in storage
 */
export default class stringsIndex implements Index<string> {
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
   * Checck if a key exists
   */
  hasKey(key: string) {
    let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
    return keys ? keys.indexOf(key) > -1 : false;
  }

  /**
   * Get all string values from storage
   */
  async getAll() {
    return new Promise<GenericReturnType<string>[]>(resolve => {
      let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
      if (!keys) keys = [];
      let items: GenericReturnType<string>[] = [];
      for (let i = 0; i < keys.length; i++) {
        items.push([keys[i], mmkvJsiModule.getStringMMKV(keys[i], this.instanceID)]);
      }
      resolve(items);
    });
  }
}
