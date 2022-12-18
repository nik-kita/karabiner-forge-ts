import { Forge } from './forge';
import { ModifierType } from './types/modifier.type';

const HYPER_AS_MODIFIERS: ModifierType[] = [
  'right_shift',
  'right_command',
  'right_control',
  'right_option',
];
const HYPER_AS_MODIFIERS_left_shift: ModifierType[] = [
  ...HYPER_AS_MODIFIERS,
  'left_shift',
];

async function main() {
  await Forge.title('Hyper from CapsLock')
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
        'right_control',
        'right_option',
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

  await Forge.title('HJKL navigation etc.')
    .addRule('arrows from HJKL')
    .addManipulator('hyper + h = left_arrow')
    .setFrom({
      key_code: 'h',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS,
      },
    })
    .setTo({
      key_code: 'left_arrow',
    })
    .completeManipulator()
    .addManipulator('hyper + l = right_arrow')
    .setFrom({
      key_code: 'l',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS,
      },
    })
    .setTo({
      key_code: 'right_arrow',
    })
    .completeManipulator()
    .addManipulator('hyper + j = down_arrow')
    .setFrom({
      key_code: 'j',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS,
      },
    })
    .setTo({
      key_code: 'down_arrow',
    })
    .completeManipulator()
    .addManipulator('hyper + k = left_arrow')
    .setFrom({
      key_code: 'k',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS,
      },
    })
    .setTo({
      key_code: 'up_arrow',
    })
    .completeManipulator()

    .completeRule()
    .addRule('arrows with selection from HJKL')
    .addManipulator('hype + left_shift + h = left_arrow + left_shift')
    .setFrom({
      key_code: 'h',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS_left_shift,
      },
    })
    .setTo({
      key_code: 'left_arrow',
      modifiers: ['left_shift'],
    })
    .completeManipulator()
    .addManipulator('hyper + left_shift + l = right_arrow + left_shift')
    .setFrom({
      key_code: 'l',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS_left_shift,
      },
    })
    .setTo({
      key_code: 'right_arrow',
      modifiers: ['left_shift'],
    })
    .completeManipulator()
    .addManipulator('hyper + left_shift + j = down_arrow + left_shift')
    .setFrom({
      key_code: 'j',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS_left_shift,
      },
    })
    .setTo({
      key_code: 'down_arrow',
      modifiers: ['left_shift'],
    })
    .completeManipulator()
    .addManipulator('hyper + left_shift + k = left_arrow + left_shift')
    .setFrom({
      key_code: 'k',
      modifiers: {
        mandatory: HYPER_AS_MODIFIERS_left_shift,
      },
    })
    .setTo({
      key_code: 'up_arrow',
      modifiers: ['left_shift'],
    })
    .completeManipulator()

    .completeRule()
    .generateJson();
}

main();
