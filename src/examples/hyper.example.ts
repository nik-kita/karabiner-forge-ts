import { Forge } from '../forge';
import { ModifierType } from '../types/modifier.type';

export const HYPER: ModifierType[] = [
  'right_shift',
  'right_command',
];

export function capsLockHyper() {
  return Forge.title('Hyper from CapsLock')
    .addRule()
    .addManipulator('caps_lock = esc(click) | hyper(hold)')
    .setFrom({
      key_code: 'caps_lock',
      modifiers: {
        optional: ['any'],
      },
    })
    .setTo({
      key_code: 'right_shift',
      modifiers: [
        'right_command',
      ],
    })
    .setToIfAlone({
      key_code: 'escape',
    })
    .completeManipulator()
    .completeRule()
    .addRule('CapsLock from shifts')
    .addManipulator('left_shift + right_shift = caps_lock')
    .setFrom({
      key_code: 'left_shift',
      modifiers: {
        mandatory: ['right_shift'],
        optional: ['caps_lock'],
      },
    })
    .setTo({
      key_code: 'caps_lock',
    })
    .setToIfAlone({
      key_code: 'left_shift',
    })
    .completeManipulator()
    .addManipulator('right_shift + left_shift = caps_lock')
    .setFrom({
      key_code: 'right_shift',
      modifiers: {
        mandatory: ['left_shift'],
        optional: ['caps_lock'],
      },
    })
    .setTo({
      key_code: 'caps_lock',
    })
    .setToIfAlone({
      key_code: 'right_shift',
    })
    .completeManipulator()
    .completeRule()
    .generateJson();
}
