export type FromType<
  KeyCode extends string = string,
  Modifiers extends object = {},
> = {
  key_code: KeyCode,
  modifiers: Modifiers,
};
