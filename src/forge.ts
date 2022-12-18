export class Forge {
  private static forges = new Map<string, Forge>();

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

  public static title(title: `${'🔥'}${string}${'🔥'}`) {
    let forge = Forge.forges.get(title);

    if (!forge) {
      forge = new Forge(title);
      Forge.forges.set(title, forge);
    }

    return forge;
  }

  public addManipulator(title: string) {
    // TODO
  }
}
