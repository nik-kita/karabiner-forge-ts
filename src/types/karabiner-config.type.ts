import { RuleType } from './rule.type';

export type KarabinerConfigType<Rules extends RuleType<any>[]> = {
  title: string,
  rules: Rules,
  url?: string,
  version?: string,
  maintainers?: string[],
  author?: string,
  website?: string,
  json_url?: string,
  import_url?: string,
  gallery_url?: string,
  repo?: string,
};
