export const tryParseAnyDate = (value: string): Date | null => {
  if (!value) {
    return null;
  }
  // For YYYY-MM-DD format, use local date construction to avoid UTC offset issues
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value);
  if (isoMatch) {
    const d = new Date(
      Number(isoMatch[1]),
      Number(isoMatch[2]) - 1,
      Number(isoMatch[3]),
    );
    return Number.isNaN(d.getTime()) ? null : d;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const parseDateString = (value: string): Date | null => {
  if (!value) {
    return null;
  }
  // Strict yyyy-MM-dd format validation
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(year, month - 1, day);

  // Verify the date didn't roll over (e.g., "2026-02-30" → "2026-03-02")
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const formatDateToString = (date: Date | string | null): string => {
  if (!date) {
    return "";
  }
  const d = date instanceof Date ? date : new Date(date);
  if (!d) {
    return "";
  }
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map((n) => String(n).padStart(2, "0"))
    .join("-");
};
