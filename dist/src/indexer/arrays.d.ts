import { Index, GenericReturnType } from '../types';
/**
 * Index of all array values stored in storage
 */
export default class arrayIndex implements Index<any[]> {
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
    getAll<T>(): Promise<GenericReturnType<T>[]>;
}
//# sourceMappingURL=arrays.d.ts.map