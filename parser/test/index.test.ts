import { politesql } from "../src/politesql";

describe('basic test', () => {
  test('there should be output', () => {
    const testQuery = `SELECT *
FROM db.table`;

    const parsed = politesql(testQuery);

    console.log(parsed);

    expect(parsed.length).toBeGreaterThan(0);
  });
});