import { handleActionAsync, handleAction } from '../handlers';
import mmkvJsiModule from '../module';
import { Index, GenericReturnType } from '../types';
const INDEX_TYPE = 'mapIndex';

/**
 * Index of all objects stored in storage.
 */
export default class mapsIndex implements Index<object> {
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
   * Check if a key exists.
   */
  hasKey(key: string) {
    let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
    return keys ? keys.indexOf(key) > -1 : false;
  }

  /**
   * Get all objects stored in storage.
   */
  async getAll<T>() {
    return new Promise<GenericReturnType<T>[]>(resolve => {
      let keys = handleAction(mmkvJsiModule.getIndexMMKV, INDEX_TYPE, this.instanceID);
      if (!keys) keys = [];
      let items: GenericReturnType<T>[] = [];
      for (let i = 0; i < keys.length; i++) {
        let item: GenericReturnType<T> = [keys[i], null];
        let map = mmkvJsiModule.getMapMMKV(keys[i], this.instanceID);
        item[1] = map ? JSON.parse(map) : null;
        items.push(item);
      }
      resolve(items);
    });
  }
}
