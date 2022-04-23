import { Index, GenericReturnType } from '../types';
/**
 * Index of all objects stored in storage.
 */
export default class mapsIndex implements Index<object> {
    instanceID: string;
    constructor(id: string);
    /**
     *
     * Get all keys
     */
    getKeys(): Promise<string[] | null | undefined>;
    /**
     * Check if a key exists.
     */
    hasKey(key: string): boolean;
    /**
     * Get all objects stored in storage.
     */
    getAll<T>(): Promise<GenericReturnType<T>[]>;
}
//# sourceMappingURL=maps.d.ts.map