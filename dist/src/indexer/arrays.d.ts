import { Index } from '../types';
/**
 * Index of all array values stored in storage
 */
export default class arrayIndex implements Index {
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
     * Get all arrays from storage.
     */
    getAll<T>(): Promise<unknown>;
}
//# sourceMappingURL=arrays.d.ts.map