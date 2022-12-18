import { Forge } from './forge';

async function main() {
  await Forge.title('test')
    .addRule('arrows to hjkl')
    .addManipulator('h to left')
    .setFrom({
      key_code: 'h',
      modifiers: {
        mandatory: [
          'left_command',
        ],
      },
    })
    .setTo({
      key_code: 'left_arrow',
    })
    .completeManipulator()
    .addManipulator('l to right')
    .setFrom({
      key_code: 'l',
      modifiers: {
        mandatory: ['left_command'],
      },
    })
    .setTo({
      key_code: 'left_arrow',
    })
    .completeManipulator()
    .addManipulator('j to down')
    .setFrom({
      key_code: 'j',
      modifiers: {
        mandatory: ['left_command'],
      },
    })
    .setTo({
      key_code: 'down_arrow',
    })
    .completeManipulator()
    .addManipulator('k to up')
    .setFrom({
      key_code: 'k',
      modifiers: {
        mandatory: ['left_command'],
      },
    })
    .setTo({
      key_code: 'up_arrow',
    })
    .completeManipulator()
    .completeRule()
    .generateJson();
}

main();
