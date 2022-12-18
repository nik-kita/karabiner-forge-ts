const modifiers = [
  'shift',
  'control',
  'option',
  'command',
] as const;

type modifierName = (typeof modifiers)[number];

export type ModifierType = `${'left' | 'right'}_${modifierName}`;
