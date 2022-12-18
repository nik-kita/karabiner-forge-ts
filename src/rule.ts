import { Forge } from './forge';
import { Manipulator } from './manipulator';
import { ManipulatorType } from './types/manipulator.type';

export class Rule {
  private constructor(private title: string, private parent: Forge) { }

  public static init(title: string, parent: Forge) {
    return new Rule(title, parent) as Pick<Rule, 'addManipulator'>;
  }

  public manipulators: ManipulatorType<any, any, any>[] = [];

  public addManipulator(title: string) {
    return Manipulator.init(title, this) as Pick<Manipulator, 'setFrom'>;
  }

  public completeRule() {
    this.parent.rules.push({
      description: this.title,
      manipulators: this.manipulators,
    });

    return this.parent as Omit<Forge, 'addRule' | 'rules'> & {
      addRule: (title: string) => ReturnType<Forge['addRule']>,
    } & Pick<Forge, 'generateJson'>;
  }
}
