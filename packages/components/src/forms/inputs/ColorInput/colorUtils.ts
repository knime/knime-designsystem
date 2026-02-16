export type KdsRgbColor = {
  r: number;
  g: number;
  b: number;
};

export type KdsHsvColor = {
  /** Hue in degrees [0..360) */
  h: number;
  /** Saturation [0..1] */
  s: number;
  /** Value [0..1] */
  v: number;
};

const HEX_RADIX = 16;

const RGB_MAX = 255;

const HUE_MAX_DEG = 360;
const HUE_SECTOR_DEG = 60;
const HUE_SECTOR_COUNT = 6;

const HUE_OFFSET_FOR_MAX_G = 2;
const HUE_OFFSET_FOR_MAX_B = 4;

const HUE_SECTOR_INDEX_2 = 2;
const HUE_SECTOR_INDEX_3 = 3;
const HUE_SECTOR_INDEX_4 = 4;
const HUE_SECTOR_INDEX_5 = 5;

const HEX_PAIR_LENGTH = 2;
const HEX_RED_START = 1;
const HEX_GREEN_START = HEX_RED_START + HEX_PAIR_LENGTH;
const HEX_BLUE_START = HEX_GREEN_START + HEX_PAIR_LENGTH;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const round = (value: number) => Math.round(value);

const padHex = (value: number) => value.toString(HEX_RADIX).padStart(2, "0");

export const normalizeHexColor = (value: string): string | null => {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const withoutHash = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;

  if (/^[0-9a-fA-F]{3}$/.test(withoutHash)) {
    const [r, g, b] = withoutHash.split("") as [string, string, string];
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
  }

  if (/^[0-9a-fA-F]{6}$/.test(withoutHash)) {
    return `#${withoutHash}`.toUpperCase();
  }

  return null;
};

export const hexToRgb = (hex: string): KdsRgbColor | null => {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return null;
  }

  const r = Number.parseInt(
    normalized.slice(HEX_RED_START, HEX_RED_START + HEX_PAIR_LENGTH),
    HEX_RADIX,
  );
  const g = Number.parseInt(
    normalized.slice(HEX_GREEN_START, HEX_GREEN_START + HEX_PAIR_LENGTH),
    HEX_RADIX,
  );
  const b = Number.parseInt(
    normalized.slice(HEX_BLUE_START, HEX_BLUE_START + HEX_PAIR_LENGTH),
    HEX_RADIX,
  );

  return { r, g, b };
};

export const rgbToHex = ({ r, g, b }: KdsRgbColor): string => {
  const rr = clamp(round(r), 0, RGB_MAX);
  const gg = clamp(round(g), 0, RGB_MAX);
  const bb = clamp(round(b), 0, RGB_MAX);

  return `#${padHex(rr)}${padHex(gg)}${padHex(bb)}`.toUpperCase();
};

export const rgbToHsv = ({ r, g, b }: KdsRgbColor): KdsHsvColor => {
  const rr = clamp(r / RGB_MAX, 0, 1);
  const gg = clamp(g / RGB_MAX, 0, 1);
  const bb = clamp(b / RGB_MAX, 0, 1);

  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;

  const v = max;
  const s = max === 0 ? 0 : delta / max;

  let h = 0;
  if (delta !== 0) {
    if (max === rr) {
      h = ((gg - bb) / delta) % HUE_SECTOR_COUNT;
    } else if (max === gg) {
      h = (bb - rr) / delta + HUE_OFFSET_FOR_MAX_G;
    } else {
      h = (rr - gg) / delta + HUE_OFFSET_FOR_MAX_B;
    }

    h *= HUE_SECTOR_DEG;
    if (h < 0) {
      h += HUE_MAX_DEG;
    }
  }

  return { h, s, v };
};

export const hsvToRgb = ({ h, s, v }: KdsHsvColor): KdsRgbColor => {
  const hh = ((h % HUE_MAX_DEG) + HUE_MAX_DEG) % HUE_MAX_DEG;
  const ss = clamp(s, 0, 1);
  const vv = clamp(v, 0, 1);

  const c = vv * ss;
  const x = c * (1 - Math.abs(((hh / HUE_SECTOR_DEG) % 2) - 1));
  const m = vv - c;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hh < HUE_SECTOR_DEG) {
    rPrime = c;
    gPrime = x;
  } else if (hh < HUE_SECTOR_INDEX_2 * HUE_SECTOR_DEG) {
    rPrime = x;
    gPrime = c;
  } else if (hh < HUE_SECTOR_INDEX_3 * HUE_SECTOR_DEG) {
    gPrime = c;
    bPrime = x;
  } else if (hh < HUE_SECTOR_INDEX_4 * HUE_SECTOR_DEG) {
    gPrime = x;
    bPrime = c;
  } else if (hh < HUE_SECTOR_INDEX_5 * HUE_SECTOR_DEG) {
    rPrime = x;
    bPrime = c;
  } else {
    rPrime = c;
    bPrime = x;
  }

  return {
    r: round((rPrime + m) * RGB_MAX),
    g: round((gPrime + m) * RGB_MAX),
    b: round((bPrime + m) * RGB_MAX),
  };
};

export const hsvToHex = (hsv: KdsHsvColor): string => rgbToHex(hsvToRgb(hsv));
