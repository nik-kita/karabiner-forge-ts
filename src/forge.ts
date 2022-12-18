import { readFile, writeFile } from 'fs';
import { homedir } from 'os';
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

  public addRule(title?: string) {
    const _title = title || `default for ${this.title}`;

    return Rule.init(_title, this) as Pick<Rule, 'addManipulator'>;
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
    const fileName = `${this.title.toLocaleLowerCase().replaceAll(' ', '_')}.json`;
    const output = outputPath || join(
      process.cwd(),
      'out',
      fileName,
    );

    const json = JSON.stringify(karabiner, null, 2);
    const karabinerPath = join(homedir(), '.config/karabiner/assets/complex_modifications', fileName);

    await new Promise<void>((resolve, reject) => {
      readFile(karabinerPath, (err) => {
        if (err) {
          writeFile(karabinerPath, json, { encoding: 'utf-8' }, (error) => {
            if (error) reject(error);
            resolve();
          });
        } else {
          writeFile(`${karabinerPath.split('.json')[0]}.new.json`, JSON.stringify({
            ...karabiner,
            title: `${this.title} new (${new Date().toISOString()})`,
          }, null, 2), { encoding: 'utf-8' }, (error) => {
            if (error) reject(error);
            resolve();
          });
        }
      });
    });

    await new Promise<void>((resolve, reject) => {
      writeFile(output, json, { encoding: 'utf-8' }, (err) => {
        if (err) reject();
        else resolve();
      });
    });
  }
}
