import { hjklArrows } from './examples/hjkl.example';
import { capsLockHyper } from './examples/hyper.example';
import { mouseClicks } from './examples/mouse-clicks.example';

async function main() {
  await capsLockHyper();
  await hjklArrows();
  await mouseClicks();
}

main();
