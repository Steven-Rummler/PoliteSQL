import { format } from "../src/format";

describe('format', () => {
  test('should lowercase keywords', () => {
    const tokens = ['SELECT', '*', 'FROM', 'db.table'];
    const query = format(tokens);
    expect(query.includes('SELECT')).toBe(false);
    expect(query.includes('select')).toBe(true);
    expect(query.includes('FROM')).toBe(false);
    expect(query.includes('from')).toBe(true);
  });
});