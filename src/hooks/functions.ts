import { DataType } from 'src/types';
import API from '../api';
import { handlers } from './constants';

export const getDataType = (value: any): DataType | null => {
  if (value === null || value === undefined) return null;
  if (Array.isArray(value)) return 'array';
  let type = typeof value;
  switch (type) {
    case 'boolean':
    case 'number':
    case 'object':
    case 'string':
      return type;
    case 'bigint':
    case 'function':
    case 'symbol':
    case 'undefined':
      return null;
  }
};

export const getInitialValue = <T>(key: string, storage: API): (() => T | null) => {
  return getInitialProperty(key, storage, 'value');
};

export const getInitialValueType = (key: string, storage: API): (() => DataType | null) => {
  return getInitialProperty(key, storage, 'type');
};

const getInitialProperty = (key: string, storage: API, property: 'type' | 'value') => () => {
  if (!storage?.indexer) {
    return null;
  }
  let indexer = storage.indexer;
  if (indexer.hasKey(key)) {
    let type: string;
    for (type in handlers) {
      const dataIndex = handlers[type].dataIndexer(indexer);
      if (dataIndex.hasKey(key)) {
        if (property === 'value') {
          return handlers[type].getter(storage)(key);
        } else {
          return type;
        }
      }
    }
  }
  return null;
};
