import { KeyCodeType } from './key-code.type';
import { ModifierType } from './modifier.type';

export type FromType<
  KeyCode extends KeyCodeType = KeyCodeType,
> = {
  key_code: KeyCode,
  modifiers?: {
    mandatory: ModifierType[],
    optional?: ModifierType[],
  } | {
    mandatory?: ModifierType[],
    optional: ModifierType[],
  },
};
