import { Forge } from '../forge';
import { ModifierType } from '../types/modifier.type';
import { HYPER } from './hyper.example';

const spacebar = 'spacebar';

export const HYPER_2: ModifierType[] = [
  'right_shift',
  'right_control',
  'right_option',
];

export function mouseClicks() {
  return Forge.title('Mouse clicks')
    .addRule('Enhance Spacebar')
    .addManipulator(`hyper + ${spacebar} = hyper2`)
    .setFrom({
      key_code: spacebar,
      modifiers: {
        mandatory: HYPER,
        optional: ['any'],
      },
    })
    .setTo({
      key_code: 'right_shift',
      modifiers: ['right_control', 'right_option'],
    })
    .completeManipulator()
    .completeRule()
    .addRule('Mouse Clicks')
    .addManipulator(`hyper + ${spacebar} + j = mouse_left_click`)
    .setFrom({
      key_code: 'j',
      modifiers: {
        mandatory: HYPER_2,
      },
    })
    .setTo({
      pointing_button: 'button1',
    })
    .completeManipulator()
    .addManipulator(`hyper + ${spacebar} + k = mouse_right_click`)
    .setFrom({
      key_code: 'k',
      modifiers: {
        mandatory: HYPER_2,
      },
    })
    .setTo({
      pointing_button: 'button2',
    })
    .completeManipulator()
    .completeRule()
    .generateJson();
}
