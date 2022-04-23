import { GenericReturnType, Index } from '../types';
/**
 * Index of all string values in storage
 */
export default class stringsIndex implements Index<string> {
    instanceID: string;
    constructor(id: string);
    /**
     * Get all keys
     */
    getKeys(): Promise<string[] | null | undefined>;
    /**
     * Checck if a key exists
     */
    hasKey(key: string): boolean;
    /**
     * Get all string values from storage
     */
    getAll(): Promise<GenericReturnType<string>[]>;
}
//# sourceMappingURL=strings.d.ts.map