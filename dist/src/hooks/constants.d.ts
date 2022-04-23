import API from 'src/api';
import { Index } from '../types';
import indexer from 'src/indexer/indexer';
export interface DataTypeHandler<T> {
    dataIndexer: (indexer: indexer) => Index<T>;
    getter: (storage: API) => (key: string) => T | null | undefined;
    setter: (storage: API) => (key: string, value: T) => boolean | null | undefined;
    copy: (value: T) => T;
}
export declare const handlers: {
    [key: string]: DataTypeHandler<any>;
};
//# sourceMappingURL=constants.d.ts.map