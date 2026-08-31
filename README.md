# ethiopian-calendar-converter

> High-performance, zero-dependency Ethiopian Calendar converter for TypeScript and JavaScript.

[![npm version](https://img.shields.io/npm/v/ethiopian-calendar-converter.svg)](https://www.npmjs.com/package/ethiopian-calendar-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Convert Gregorian dates to the Ethiopian (Ge'ez) Calendar and vice-versa with dual language support (Amharic & English), leap-year calculations, and high-speed $O(1)$ integer arithmetic.

## Features

- ⚡ **High Performance** – Pure $O(1)$ mathematical conversion (~1 µs per operation).
- 🌐 **Universal Compatibility** – Runs everywhere JS/TS executes (Node.js, Browsers, React, Vue, Next.js, React Native, Bun, Deno & Edge Functions).
- 🔄 **Bidirectional** – Convert Gregorian $\rightarrow$ Ethiopian and Ethiopian $\rightarrow$ Gregorian.
- 📦 **Zero Dependencies** – Lightweight and tree-shakeable.
- 📘 **First-Class TypeScript** – Written in TypeScript with full type definitions included.
- 🌍 **Localization** – Pre-packaged Amharic (አማርኛ) and English month names.

## Installation

```bash
npm install ethiopian-calendar-converter
# or
yarn add ethiopian-calendar-converter
# or
pnpm add ethiopian-calendar-converter
```

## Quick Start

### Basic Usage (TypeScript / ESM)

```typescript
import { 
  gregorianToEth, 
  ethiopianToGregorian, 
  toEthiopianDate, 
  getCurrentEthiopian 
} from 'ethiopian-calendar-converter';

// Convert Gregorian to Ethiopian
const eth = gregorianToEth('2026-08-31');
// { year: 2018, month: 12, day: 25, monthNameAm: 'ነሐሴ', monthNameEn: 'Nehase' }

// Format as localized date string
console.log(toEthiopianDate('2026-08-31', 'am')); // "25 ነሐሴ 2018"
console.log(toEthiopianDate('2026-08-31', 'en')); // "25 Nehase 2018"

// Convert Ethiopian to Gregorian (Inverse)
const greg = ethiopianToGregorian(2018, 12, 25);
// { year: 2026, month: 8, day: 31 }
```

### Backend Example (Express / Node.js API)

```typescript
import express from 'express';
import { gregorianToEth, toEthiopianDate } from 'ethiopian-calendar-converter';

const app = express();

app.get('/api/date-convert', (req, res) => {
  const date = (req.query.date as string) || new Date();
  res.json({
    ethiopian: gregorianToEth(date),
    formatted: toEthiopianDate(date, 'am')
  });
});
```

### Frontend Example (React / Next.js Component)

```tsx
import React from 'react';
import { toEthiopianDate } from 'ethiopian-calendar-converter';

export function DateBanner({ gregorianDate }: { gregorianDate: string }) {
  return (
    <div>
      <h3>Ethiopian Date:</h3>
      <p>{toEthiopianDate(gregorianDate, 'am')}</p>
    </div>
  );
}
```

## API Reference

| Function | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `gregorianToEth` | `(date?: Date \| string \| number, month?: number, day?: number)` | `EthiopianDate \| null` | Converts Gregorian date/timestamp/components to Ethiopian date object. |
| `ethiopianToGregorian` | `(year: number, month: number, day: number)` | `GregorianDate` | Converts Ethiopian date components back to Gregorian date object. |
| `toEthiopianDate` | `(date?: Date \| string \| number, lang?: 'am' \| 'en')` | `string` | Formats a Gregorian date into a formatted Ethiopian date string. |
| `getCurrentEthiopian` | `()` | `EthiopianDate` | Returns current Ethiopian date object. |
| `isEthiopianLeapYear` | `(year: number)` | `boolean` | Checks if an Ethiopian year is a leap year (6 Pagume days). |
| `getEthiopianYearRange`| `(ethYear: number)` | `{ start: GregorianDate, end: GregorianDate }` | Returns exact Gregorian start and end date bounds for an Ethiopian year. |

## License

[MIT](LICENSE)