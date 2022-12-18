import { writeFile } from 'fs';
import { join } from 'path';
import { Rule } from './rule';
import { KarabinerConfigType } from './types/karabiner-config.type';
import { RuleType } from './types/rule.type';

export class Forge {
  private static forges = new Map<string, Forge>();

  public rules: RuleType<any>[] = [];

  private constructor(
    private title: string,
    private url?: string,
    private version?: string,
    private author?: string,
    private website?: string,
    private json_url?: string,
    private import_url?: string,
    private gallery_url?: string,
    private repo?: string,
    private maintainers?: string[],
  ) { }

  public static title(title: string) {
    // eslint-disable-next-line no-param-reassign
    title = `🔥 ${title} 🔥`;

    let forge = Forge.forges.get(title);

    if (!forge) {
      forge = new Forge(title);
      Forge.forges.set(title, forge);
    }

    return forge as Pick<Forge, 'addRule'>;
  }

  public addRule(title: string) {
    return Rule.init(title, this) as Pick<Rule, 'addManipulator'>;
  }

  public async generateJson(
    outputPath?: string,
    options: {
      url?: string,
      version?: string,
      author?: string,
      website?: string,
      json_url?: string,
      import_url?: string,
      gallery_url?: string,
      repo?: string,
      maintainers?: string[],
    } = {},
  ) {
    const karabiner: KarabinerConfigType<
      typeof this.rules
    > = {
      title: this.title,
      rules: this.rules,
      ...options,
    };
    const output = outputPath || join(
      process.cwd(),
      'out',
      `${this.title.toLocaleLowerCase().replaceAll(' ', '_')}.json`,
    );

    const json = JSON.stringify(karabiner, null, 2);

    await new Promise<void>((resolve, reject) => {
      writeFile(output, json, { encoding: 'utf-8' }, (err) => {
        if (err) reject();
        else resolve();
      });
    });
  }
}
