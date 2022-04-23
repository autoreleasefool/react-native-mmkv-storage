import { useCallback, useEffect, useState } from 'react';
import API from '../api';
import { DataType, GenericReturnType } from '../types';
import { DataTypeHandler, handlers } from './constants';

/**
 * A hook that will take an array of keys and returns an array of values for those keys.
 * This is supposed to work in combination with `Transactions`s. When you have build your custom index,
 * you will need an easy and quick way to load values for your index. useIndex hook actively listens
 * to all read/write changes and updates the values accordingly.
 *
 * ```tsx
 * import MMKVStorage from "react-native-mmkv-storage"
 *
 * const storage = new MMKVStorage.Loader().initialize();
 *
 * const App = () => {
    const postsIndex = useMMKVStorage("postsIndex",MMKV,[]);
    const [posts] = useIndex(postsIndex,"object" MMKV);

    return <View>
    <FlatList
    data={posts}
    renderItem={...}
    >
</View>

}
 * ```
 *
 * Documentation: https://rnmmkv.vercel.app/#/useindex
 *
 * @param keys Array of keys against which the hook should load values
 * @param type Type of values
 * @param storage The storage instance
 *
 * @returns `[values, update, remove]`
 */
export const useIndex = <T>(
  keys: string[],
  type: DataType,
  storage: API
): [
  values: (T | null | undefined)[],
  update: (key: string, value?: T | null | undefined) => void,
  remove: (key: string) => void
] => {
  const [values, setValues] = useState<GenericReturnType<T>[]>(
    storage.getMultipleItems(keys || [], type)
  );

  const onChange = useCallback(({ key }) => {
    setValues(values => {
      const handler = handlers[type] as DataTypeHandler<T>;
      let index = values.findIndex(v => v[0] === key);
      let value = handler.getter(storage)(key);
      if (value) {
        if (index !== -1) {
          values[index][1] = value;
        } else {
          setValues(storage.getMultipleItems(keys || [], type));
        }
      } else {
        values.splice(index);
      }
      return [...values];
    });
  }, []);

  useEffect(() => {
    let names = keys.map(v => `${v}:onwrite`);
    storage.ev.subscribeMulti(names, onChange);

    return () => {
      names.forEach(name => {
        storage.ev.unsubscribe(name, onChange);
      });
    };
  }, [keys, type]);

  const update = useCallback((key, value) => {
    if (!value) return remove(key);
    const handler = handlers[type] as DataTypeHandler<T>;
    handler.setter(storage)(key, value);
  }, []);

  const remove = useCallback(key => {
    storage.removeItem(key);
  }, []);

  return [values.map(v => v[1]).filter(v => v !== null), update, remove];
};
