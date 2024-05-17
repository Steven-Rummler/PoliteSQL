import { format } from "./format";
import { tokenize } from "./tokenize";

export function politesql(query: string): string {
  return format(tokenize(query));
}

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