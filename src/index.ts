/**
 * Ethiopian Calendar Utility Module
 * Convert Gregorian dates to Ethiopian Calendar format and vice-versa.
 */

export type Language = 'am' | 'en';

export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthNameAm: string;
  monthNameEn: string;
}

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

export const ETHIOPIAN_MONTHS_AM: readonly string[] = Object.freeze([
  "መስከረም",
  "ጥቅምት",
  "ሕዳር",
  "ታሕሳስ",
  "ጥር",
  "የካቲት",
  "መጋቢት",
  "ሚያዚያ",
  "ግንቦት",
  "ሰኔ",
  "ሐምሌ",
  "ነሐሴ",
  "ጳጉሜ",
]);

export const ETHIOPIAN_MONTHS_EN: readonly string[] = Object.freeze([
  "Meskerem",
  "Tikimt",
  "Hidar",
  "Tahsas",
  "Tir",
  "Yekatit",
  "Megabit",
  "Miyazia",
  "Ginbot",
  "Sene",
  "Hamle",
  "Nehase",
  "Pagume",
]);

/**
 * Fast O(1) calculation converting Gregorian date to Julian Day Number (JDN).
 */
export function gregorianToJulianDay(year: number, month: number, day: number): number {
  const n = ((14 - month) / 12) | 0;
  const p = year + 4800 - n;
  const d = month + 12 * n - 3;
  return (
    day +
    (((153 * d + 2) / 5) | 0) +
    365 * p +
    (p >> 2) -
    ((p / 100) | 0) +
    ((p / 400) | 0) -
    32045
  );
}

/**
 * Converts Julian Day Number (JDN) to Ethiopian Calendar date.
 */
export function julianDayToEthiopian(jdn: number): { year: number; month: number; day: number } {
  const r = (jdn - 1724221) | 0;
  const a = (r / 1461) | 0;
  const n = r % 1461;
  const p = n < 365 ? 0 : n < 730 ? 1 : n < 1096 ? 2 : 3;
  const d = n - (p === 0 ? 0 : p === 1 ? 365 : p === 2 ? 730 : 1096);

  return {
    year: (4 * a + p + 1) | 0,
    month: ((d / 30) | 0) + 1,
    day: (d % 30) + 1,
  };
}

/**
 * Converts Julian Day Number (JDN) back to Gregorian date.
 */
export function jdnToGregorian(jdn: number): GregorianDate {
  const a = (jdn + 32044) | 0;
  const b = (((4 * a + 3) / 146097) | 0);
  const c = a - (((146097 * b) / 4) | 0);
  const d = (((4 * c + 3) / 1461) | 0);
  const e = c - (((1461 * d) / 4) | 0);
  const f = (((5 * e + 2) / 153) | 0);
  const day = e - (((153 * f + 2) / 5) | 0) + 1;
  const fDiv10 = (f / 10) | 0;
  const month = f + 3 - 12 * fDiv10;
  const year = 100 * b + d - 4800 + fDiv10;
  return { year, month, day };
}

/**
 * Converts Ethiopian Calendar date to Julian Day Number (JDN).
 */
export function ethiopianToJulianDay(year: number, month: number, day: number): number {
  return 1724221 + (year - 1) * 365 + (((year - 1) / 4) | 0) + (month - 1) * 30 + (day - 1);
}

/**
 * Converts Ethiopian Calendar date to Gregorian date object.
 */
export function ethiopianToGregorian(year: number, month: number, day: number): GregorianDate {
  const jdn = ethiopianToJulianDay(year, month, day);
  return jdnToGregorian(jdn);
}

export const ethToGregorian = ethiopianToGregorian;

/**
 * Converts a Gregorian date (Date object, ISO string, timestamp, or year, month, day)
 * to an Ethiopian calendar date object.
 */
export function gregorianToEth(
  date?: Date | string | number | null,
  monthParam?: number,
  dayParam?: number
): EthiopianDate | null {
  let y: number;
  let m: number;
  let d: number;

  if (typeof date === 'number' && monthParam !== undefined && dayParam !== undefined) {
    y = date;
    m = monthParam;
    d = dayParam;
  } else if (date instanceof Date) {
    if (isNaN(date.getTime())) return null;
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
  } else if (typeof date === 'string' || typeof date === 'number') {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return null;
    y = parsed.getFullYear();
    m = parsed.getMonth() + 1;
    d = parsed.getDate();
  } else if (!date) {
    return null;
  } else {
    return null;
  }

  const jdn = gregorianToJulianDay(y, m, d);
  const eth = julianDayToEthiopian(jdn);
  const mIndex = eth.month - 1;

  return {
    year: eth.year,
    month: eth.month,
    day: eth.day,
    monthNameAm: ETHIOPIAN_MONTHS_AM[mIndex] || String(eth.month),
    monthNameEn: ETHIOPIAN_MONTHS_EN[mIndex] || String(eth.month),
  };
}

/**
 * Formats a Gregorian date into a readable Ethiopian date string.
 * @param date - Date input (Date, ISO string, timestamp, or year)
 * @param language - Language choice ('am' for Amharic or 'en' for English). Defaults to 'am'.
 */
export function toEthiopianDate(
  date?: Date | string | number | null,
  language: Language = 'am'
): string {
  const eth = gregorianToEth(date);
  if (!eth) return "-";
  const monthName = language === 'en' ? eth.monthNameEn : eth.monthNameAm;
  return `${eth.day} ${monthName} ${eth.year}`;
}

/**
 * Gets the current Ethiopian date.
 */
export function getCurrentEthiopian(): EthiopianDate {
  return gregorianToEth(new Date())!;
}

/**
 * Determines if an Ethiopian year is a leap year (6 days in Pagume).
 * In the Ethiopian Calendar cycle, leap years occur every 4 years when year % 4 === 3.
 */
export function isEthiopianLeapYear(year: number): boolean {
  return (year % 4 + 4) % 4 === 3;
}

/**
 * Returns the exact Gregorian date range for an Ethiopian year.
 */
export function getEthiopianYearRange(ethYear: number): { start: GregorianDate; end: GregorianDate } {
  const startJdn = ethiopianToJulianDay(ethYear, 1, 1);
  const totalDays = isEthiopianLeapYear(ethYear) ? 366 : 365;
  const endJdn = startJdn + totalDays - 1;

  return {
    start: jdnToGregorian(startJdn),
    end: jdnToGregorian(endJdn),
  };
}
