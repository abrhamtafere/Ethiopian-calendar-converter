const assert = require('assert');
const {
  gregorianToEth,
  toEthiopianDate,
  getCurrentEthiopian,
  isEthiopianLeapYear,
  ethiopianToGregorian,
  ethToGregorian,
  getEthiopianYearRange,
  ETHIOPIAN_MONTHS_AM,
  ETHIOPIAN_MONTHS_EN,
} = require('./dist/index');

console.log('=== Ethiopian Calendar Converter Test Suite ===\n');

// 1. Specific Date Conversions
const testCases = [
  { greg: '2026-08-31', expectedEth: { year: 2018, month: 12, day: 25, monthNameAm: 'ነሐሴ', monthNameEn: 'Nehase' } },
  { greg: '2024-09-11', expectedEth: { year: 2017, month: 1, day: 1, monthNameAm: 'መስከረም', monthNameEn: 'Meskerem' } },
  { greg: '2024-09-10', expectedEth: { year: 2016, month: 13, day: 5, monthNameAm: 'ጳጉሜ', monthNameEn: 'Pagume' } },
  { greg: '2023-09-12', expectedEth: { year: 2016, month: 1, day: 1, monthNameAm: 'መስከረም', monthNameEn: 'Meskerem' } },
  { greg: '2023-09-11', expectedEth: { year: 2015, month: 13, day: 6, monthNameAm: 'ጳጉሜ', monthNameEn: 'Pagume' } }, // Eth 2015 Leap Year Pagume day 6
];

testCases.forEach(({ greg, expectedEth }) => {
  const result = gregorianToEth(greg);
  assert.ok(result, `Failed for date ${greg}`);
  assert.strictEqual(result.year, expectedEth.year);
  assert.strictEqual(result.month, expectedEth.month);
  assert.strictEqual(result.day, expectedEth.day);
  assert.strictEqual(result.monthNameAm, expectedEth.monthNameAm);
  assert.strictEqual(result.monthNameEn, expectedEth.monthNameEn);

  const formattedAm = toEthiopianDate(greg, 'am');
  const formattedEn = toEthiopianDate(greg, 'en');
  console.log(`✓ Gregorian ${greg} -> Eth ${result.year}-${result.month}-${result.day} (${formattedAm} | ${formattedEn})`);
});

// 2. Test Inverse Conversion (ethiopianToGregorian)
console.log('\n--- Inverse Conversion Tests ---');
const inverseTests = [
  { eth: { year: 2018, month: 12, day: 25 }, expectedGreg: { year: 2026, month: 8, day: 31 } },
  { eth: { year: 2017, month: 1, day: 1 }, expectedGreg: { year: 2024, month: 9, day: 11 } },
  { eth: { year: 2015, month: 13, day: 6 }, expectedGreg: { year: 2023, month: 9, day: 11 } },
];

inverseTests.forEach(({ eth, expectedGreg }) => {
  const res = ethiopianToGregorian(eth.year, eth.month, eth.day);
  assert.strictEqual(res.year, expectedGreg.year);
  assert.strictEqual(res.month, expectedGreg.month);
  assert.strictEqual(res.day, expectedGreg.day);
  console.log(`✓ Ethiopian ${eth.year}-${eth.month}-${eth.day} -> Gregorian ${res.year}-${res.month}-${res.day}`);
});

// Alias check
assert.strictEqual(ethToGregorian, ethiopianToGregorian);

// 3. Leap Year Tests
console.log('\n--- Leap Year Tests ---');
assert.strictEqual(isEthiopianLeapYear(2015), true);  // 2015 EE was a leap year (6 Pagume days in Sep 2023)
assert.strictEqual(isEthiopianLeapYear(2016), false);
assert.strictEqual(isEthiopianLeapYear(2017), false);
assert.strictEqual(isEthiopianLeapYear(2018), false);
assert.strictEqual(isEthiopianLeapYear(2019), true);
console.log('✓ Leap year logic verified.');

// 4. Current Ethiopian Date
console.log('\n--- Current Ethiopian Date ---');
const currentEth = getCurrentEthiopian();
console.log(`✓ Current Ethiopian Date: ${currentEth.day} ${currentEth.monthNameAm} (${currentEth.monthNameEn}) ${currentEth.year}`);

// 5. Input Signature Flexibility
console.log('\n--- Input Signature Flexibility ---');
const d1 = gregorianToEth(new Date('2026-08-31'));
const d2 = gregorianToEth(2026, 8, 31);
const d3 = gregorianToEth('2026-08-31');
assert.deepStrictEqual(d1, d2);
assert.deepStrictEqual(d2, d3);
console.log('✓ Input flexible signatures (Date, numbers, string) verified.');

// 6. Invalid Input Tests
assert.strictEqual(gregorianToEth(null), null);
assert.strictEqual(gregorianToEth('invalid-date'), null);
assert.strictEqual(toEthiopianDate('invalid-date'), '-');
console.log('✓ Edge cases & invalid input gracefully handled.');

// 7. Month Array Constants
assert.strictEqual(ETHIOPIAN_MONTHS_AM.length, 13);
assert.strictEqual(ETHIOPIAN_MONTHS_EN.length, 13);
console.log('✓ Month constants verified.');

// 8. Performance Benchmark
console.log('\n--- Performance Benchmark ---');
const start = process.hrtime.bigint();
const iterations = 100000;
for (let i = 0; i < iterations; i++) {
  gregorianToEth('2026-08-31');
}
const end = process.hrtime.bigint();
const totalMs = Number(end - start) / 1e6;
console.log(`✓ Converted ${iterations.toLocaleString()} dates in ${totalMs.toFixed(2)} ms (${(totalMs / iterations * 1000).toFixed(4)} µs/op)`);

console.log('\nAll tests passed successfully! 🎉');