import { ManipulatorType } from './manipulator.type';

export type RuleType<Manipulators extends ManipulatorType<any, any, any>[]> = {
  description: string,
  manipulators: Manipulators,
};
