import { Rule } from './rule';
import { FromType } from './types/from.type';
import { ManipulatorType } from './types/manipulator.type';
import { ToIfAloneType } from './types/to-if-alone.type';
import { ToType } from './types/to.type';

export class Manipulator {
  private constructor(
    private title: string,
    private parent: Rule,
  ) { }

  public static init(title: string, parent: Rule) {
    return new Manipulator(title, parent) as Pick<Manipulator, 'setFrom'>;
  }

  private from?: FromType;

  setFrom(options: FromType) {
    this.from = options;

    return this as Pick<Manipulator, 'setTo'>;
  }

  to?: ToType;

  setTo(options: ToType) {
    this.to = options;

    return this as Pick<Manipulator, 'setToIfAlone' | 'completeManipulator'>;
  }

  to_if_alone?: ToIfAloneType;

  setToIfAlone(options: ToIfAloneType) {
    this.to_if_alone = options;

    return this as Pick<Manipulator, 'completeManipulator'>;
  }

  completeManipulator() {
    const config: ManipulatorType<
      FromType,
      ToType,
      ToIfAloneType
    > = {
      type: 'basic',
      description: this.title,
      from: this.from!,
      to: this.to!,
      ...(this.to_if_alone && { to_if_alone: this.to_if_alone }),
    };

    this.parent.manipulators.push(config);

    return this.parent as Pick<Rule, 'addManipulator' | 'completeRule'>;
  }
}
