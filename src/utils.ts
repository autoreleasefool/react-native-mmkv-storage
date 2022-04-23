import { StorageOptions } from './types';

export function promisify(fn: Function) {
  return function (...args: any) {
    return new Promise(resolve => {
      resolve(fn(...args));
    });
  };
}
/**
 * Accessible modes for iOS Keychain
 */
export const ACCESSIBLE = {
  WHEN_UNLOCKED: 'AccessibleWhenUnlocked',
  AFTER_FIRST_UNLOCK: 'AccessibleAfterFirstUnlock',
  ALWAYS: 'AccessibleAlways',
  WHEN_PASSCODE_SET_THIS_DEVICE_ONLY: 'AccessibleWhenPasscodeSetThisDeviceOnly',
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'AccessibleWhenUnlockedThisDeviceOnly',
  AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY: 'AccessibleAfterFirstUnlockThisDeviceOnly',
  ALWAYS_THIS_DEVICE_ONLY: 'AccessibleAlwaysThisDeviceOnly'
};

/**
 * Processing modes for storage.
 */
export const MODES = {
  SINGLE_PROCESS: 1,
  MULTI_PROCESS: 2
};

export const DATA_TYPES = Object.freeze({
  STRING: 1,
  NUMBER: 2,
  BOOL: 3,
  MAP: 4,
  ARRAY: 5
});

/**
 * Information about all storage instances
 */
export const options: { [name: string]: StorageOptions } = {};

export const stringToHex = (input: string) => {
  return String(Array(input).map(char => char.charCodeAt(0).toString(16)));
};
