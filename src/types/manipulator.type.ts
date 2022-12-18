import { FromType } from './from.type';
import { ToIfAloneType } from './to-if-alone.type';
import { ToType } from './to.type';

export type ManipulatorType<
  From extends FromType,
  To extends ToType,
  ToIfAlone extends ToIfAloneType = {},
> = {
  description: string,
  type: 'basic',
  from: From,
  to: To,
  to_if_alone?: ToIfAlone,
};
