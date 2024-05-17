import { tokenize } from '../src/tokenize';

describe('tokenize', () => {
  test('should separate by space', () => {
    const query = `SELECT *
FROM db.table`;
    const tokens = ['SELECT', '*', 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
  test('should ignore spaces inside single quotes', () => {
    const query = `SELECT 'quoted string'
FROM db.table`;
    const tokens = ['SELECT', "'quoted string'", 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
  test('should ignore double quotes inside single quotes', () => {
    const query = `SELECT 'quoted "string"'
FROM db.table`;
    const tokens = ['SELECT', "'quoted \"string\"'", 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
  test('should treat commas as distinct tokens', () => {
    const query = `SELECT column1, column2, column3
FROM db.table`;
    const tokens = ['SELECT', 'column1', ',', 'column2', ',', 'column3', 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
  test('should treat math characters as distinct tokens', () => {
    const query = `SELECT 1+1
FROM db.table`;
    const tokens = ['SELECT', '1', '+', '1', 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
  test('should treat brace characters as distinct tokens', () => {
    const query = `SELECT (1+1), [2+2], {3+3}, uniqExact(column), count(*)
FROM db.table`;
    const tokens = ['SELECT', '(', '1', '+', '1', ')', ',', '[', '2', '+', '2', ']', ',', '{', '3', '+', '3', '}', ',', 'uniqExact', '(', 'column', ')', ',', 'count', '(', '*', ')', 'FROM', 'db.table'];
    expect(tokenize(query)).toStrictEqual(tokens);
  });
});