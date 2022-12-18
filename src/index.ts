import { Forge } from './forge';

async function main() {
  await Forge.title('test')
    .addRule('arrows to hjkl')
    .addManipulator('h')
    .setFrom({
      key_code: 'h',
      modifiers: {
        mandatory: [
          'left_command',
        ],
      },
    })
    .setTo({
      key_code: 'a',
      modifiers: {
        mandatory: ['left_command'],
      },
    })
    .completeManipulator()
    .completeRule()
    .generateJson();
}

main();
