import API from 'src/api';
import { Index } from '../types';
import indexer from 'src/indexer/indexer';

export interface DataTypeHandler<T> {
  dataIndexer: (indexer: indexer) => Index;
  getter: (storage: API) => (key: string) => T | null | undefined;
  setter: (storage: API) => (key: string, value: T) => boolean | null | undefined;
  copy: (value: T) => T;
}

const stringHandler: DataTypeHandler<string> = {
  dataIndexer: (indexer: indexer) => indexer.strings,
  getter: (storage: API) => storage.getString,
  setter: (storage: API) => storage.setString,
  copy: (value: string) => value
};

const numberHandler: DataTypeHandler<number> = {
  dataIndexer: (indexer: indexer) => indexer.numbers,
  getter: (storage: API) => storage.getInt,
  setter: (storage: API) => storage.setInt,
  copy: (value: number) => value
};

const booleanHandler: DataTypeHandler<boolean> = {
  dataIndexer: (indexer: indexer) => indexer.booleans,
  getter: (storage: API) => storage.getBool,
  setter: (storage: API) => storage.setBool,
  copy: (value: boolean) => value
};

const arrayHandler: DataTypeHandler<any[]> = {
  dataIndexer: (indexer: indexer) => indexer.arrays,
  getter: (storage: API) => storage.getArray,
  setter: (storage: API) => storage.setArray,
  copy: (value: any[]) => [...value]
};

const objectHandler: DataTypeHandler<object> = {
  dataIndexer: (indexer: indexer) => indexer.maps,
  getter: (storage: API) => storage.getMap,
  setter: (storage: API) => storage.setMap,
  copy: (value: object) => ({ ...value })
};

export const handlers: { [key: string]: DataTypeHandler<any> } = {
  string: stringHandler,
  number: numberHandler,
  boolean: booleanHandler,
  object: objectHandler,
  array: arrayHandler
};
