# ethiopian-calendar-converter

> High-performance, zero-dependency Ethiopian Calendar converter for TypeScript and JavaScript.

[![npm version](https://img.shields.io/npm/v/ethiopian-calendar-converter.svg)](https://www.npmjs.com/package/ethiopian-calendar-converter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Convert Gregorian dates to the Ethiopian (Ge'ez) Calendar and vice-versa with dual language support (Amharic & English), leap-year calculations, and high-speed $O(1)$ integer arithmetic.

## Features

- ⚡ **High Performance** – Pure $O(1)$ mathematical conversion (~1 µs per operation).
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

### TypeScript / ESM

```typescript
import { 
  gregorianToEth, 
  ethiopianToGregorian, 
  toEthiopianDate, 
  getCurrentEthiopian 
} from 'ethiopian-calendar-converter';

// 1. Convert Gregorian to Ethiopian
const eth = gregorianToEth('2026-08-31');
// { year: 2018, month: 12, day: 25, monthNameAm: 'ነሐሴ', monthNameEn: 'Nehase' }

// 2. Format as localized date string
console.log(toEthiopianDate('2026-08-31', 'am')); // "25 ነሐሴ 2018"
console.log(toEthiopianDate('2026-08-31', 'en')); // "25 Nehase 2018"

// 3. Convert Ethiopian to Gregorian (Inverse)
const greg = ethiopianToGregorian(2018, 12, 25);
// { year: 2026, month: 8, day: 31 }

// 4. Current Ethiopian Date
const today = getCurrentEthiopian();
```

### CommonJS

```javascript
const { gregorianToEth, toEthiopianDate } = require('ethiopian-calendar-converter');

console.log(toEthiopianDate(new Date()));
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