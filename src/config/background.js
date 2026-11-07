// EDIT THIS FILE to tune the animated background.
export const BACKGROUND = {
  // Palette, as hex colors. These four plus the base blue make up the blend.
  base:   '#2a3bd0',
  deep:   '#0d1a8c',
  purple: '#7a4fc7',
  teal:   '#1fa6bf',
  pink:   '#ed7ba6',

  speed: 0.05,            // how fast the colors drift. 0.02 is slow, 0.12 is lively
  grain: 0.10,            // film grain strength. 0 turns it off
  mouseInfluence: 0.08,   // how far the colors shift toward the pointer. 0 turns it off
  maxPixelRatio: 1.5      // lower (1) for slower phones, raise (2) for sharper screens
};
