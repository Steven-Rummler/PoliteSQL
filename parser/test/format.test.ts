import { format } from "../src/format";
import { tokenize } from "../src/tokenize";

describe('format', () => {
  test('should lowercase keywords', () => {
    const query = `SELECT column, count(*)
FROM db.table
WHERE column = 1
GROUP BY column
HAVING count(*) > 1
ORDER BY count(*) desc`;
    const formatted = format(tokenize(query));
    expect(formatted.includes('SELECT')).toBe(false);
    expect(formatted.includes('select')).toBe(true);
    expect(formatted.includes('FROM')).toBe(false);
    expect(formatted.includes('from')).toBe(true);
    expect(formatted.includes('WHERE')).toBe(false);
    expect(formatted.includes('where')).toBe(true);
    expect(formatted.includes('GROUP BY')).toBe(false);
    expect(formatted.includes('group by')).toBe(true);
    expect(formatted.includes('HAVING')).toBe(false);
    expect(formatted.includes('having')).toBe(true);
    expect(formatted.includes('ORDER BY')).toBe(false);
    expect(formatted.includes('order by')).toBe(true);
  });
  test('should indent before certain keywords', () => {
    const query = `SELECT column, count(*)
FROM db.table
WHERE column = 1
GROUP BY column
HAVING count(*) > 1
ORDER BY count(*) desc`;
    const formatted = format(tokenize(query));
    console.log(formatted);
    expect(formatted.startsWith('select')).toBe(true);
    expect(formatted.includes('\nselect')).toBe(false);
    expect(formatted.includes('\nfrom')).toBe(true);
    expect(formatted.includes('\nwhere')).toBe(true);
    expect(formatted.includes('\ngroup by')).toBe(true);
    expect(formatted.includes('\nhaving')).toBe(true);
    expect(formatted.includes('\norder by')).toBe(true);
  });
  test('should format nicely around commas', () => {
    const query = `SELECT column1, column2, column3
FROM db.table`;
    const formatted = format(tokenize(query));
    expect(formatted).toBe('select column1, column2, column3\nfrom db.table');
  });
});