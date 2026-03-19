import type { KdsTimeInputValue } from "./types";

const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;
const MAX_MILLISECONDS = 999;
const MILLISECONDS_DIGITS = 3;

const EMPTY_TIME: KdsTimeInputValue = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};

const clampInteger = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) {
    return min;
  }

  const rounded = Math.floor(value);
  return Math.min(max, Math.max(min, rounded));
};

export const normalizeTimeValue = (
  value: Partial<KdsTimeInputValue> | KdsTimeInputValue,
): KdsTimeInputValue => ({
  hours: clampInteger(value.hours ?? 0, 0, MAX_HOURS),
  minutes: clampInteger(value.minutes ?? 0, 0, MAX_MINUTES),
  seconds: clampInteger(value.seconds ?? 0, 0, MAX_SECONDS),
  milliseconds: clampInteger(value.milliseconds ?? 0, 0, MAX_MILLISECONDS),
});

export const parseTimeInput = (input: string): KdsTimeInputValue | null => {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return null;
  }

  const match = trimmed.match(
    /^(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?$/,
  );

  if (!match) {
    return null;
  }

  const [, hoursPart, minutesPart, secondsPart, millisecondsPart] = match;

  const hours = Number.parseInt(hoursPart ?? "", 10);
  const minutes = Number.parseInt(minutesPart ?? "", 10);
  const seconds = Number.parseInt(secondsPart ?? "0", 10);
  const milliseconds = Number.parseInt(millisecondsPart ?? "0", 10);

  const isWithinBounds =
    hours >= 0 &&
    hours <= MAX_HOURS &&
    minutes >= 0 &&
    minutes <= MAX_MINUTES &&
    seconds >= 0 &&
    seconds <= MAX_SECONDS &&
    milliseconds >= 0 &&
    milliseconds <= MAX_MILLISECONDS;

  if (!isWithinBounds) {
    return null;
  }

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

export const formatTimeInput = (
  value: Partial<KdsTimeInputValue> | KdsTimeInputValue,
) => {
  const normalized = normalizeTimeValue(value);

  const hours = normalized.hours.toString().padStart(2, "0");
  const minutes = normalized.minutes.toString().padStart(2, "0");
  const seconds = normalized.seconds.toString().padStart(2, "0");
  const milliseconds = normalized.milliseconds
    .toString()
    .padStart(MILLISECONDS_DIGITS, "0");

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getEmptyTimeValue = () => ({ ...EMPTY_TIME });
