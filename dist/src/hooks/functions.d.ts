import { DataType } from 'src/types';
import API from '../api';
export declare const getDataType: (value: any) => DataType | null;
export declare const getInitialValue: <T>(key: string, storage: API) => () => T | null;
export declare const getInitialValueType: (key: string, storage: API) => (() => DataType | null);
//# sourceMappingURL=functions.d.ts.map