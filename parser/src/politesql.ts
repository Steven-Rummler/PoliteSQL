export function politesql(query: string): string {
  return `${query} -> ${tokenize(query).map(token => `'${token}'`).join(', ')}`;
}

function tokenize(input: string): string[] {
  const tokens = [];
  let currentToken = '';
  let currentQuote: '\'' | '"' | "`" | null = null;

  for (let i = 0; i < input.length; i++) {
    const thisCharacter = input[i];
    if (thisCharacter === undefined) throw new Error('Unexpected end of query while tokenizing.');
    if (currentQuote === null) {
      if (spaceCharacters.includes(thisCharacter)) {
        if (currentToken.length === 0) continue;
        tokens.push(currentToken);
        currentToken = '';
      } else currentToken += thisCharacter;
    }
  }
  tokens.push(currentToken);

  return tokens;
}

const spaceCharacters = [' ', '\t', '\n', '\r'];

interface Table {
  alias: string;
  columns: Column[];
}

interface DatabaseTable extends Table {
  database: string;
  name: string;
}

interface Column {
  name: string;
  type: string;
}

interface Query {
  select: LabelledExpression[];
  from: Table;
  where: Expression[];
  groupBy: Expression[];
  having: Expression[];
  orderBy: Expression[];
}

interface SubQuery extends Query, Table {

}

interface LabelledExpression {
  label: string;
  expression: Expression;
}

interface Expression {
  tokens: (string | Function)[];
}

interface Function {
  name: string;
  arguments: Expression[];
}