import { GenericReturnType, Index } from '../types';
/**
 * Index of all numbers stored in storage.
 */
export default class numbersIndex implements Index<number> {
    instanceID: string;
    constructor(id: string);
    /**
     *
     * Get all keys
     */
    getKeys(): Promise<string[] | null | undefined>;
    /**
     * Check if a key exists
     */
    hasKey(key: string): boolean;
    /**
     * Get all numbers from storage
     */
    getAll(): Promise<GenericReturnType<number>[]>;
}
//# sourceMappingURL=numbers.d.ts.map