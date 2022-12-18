import { FromType } from './from.type';

// TODO split
export type ToType = FromType | {
  pointing_button: 'button1' | 'button2'
}
